/**
The abstract class representing a generic Container in an Experiment
*/
class Container extends Equipment{

    /**
    Create a new, empty, Container object with the given position, mass, capacity, residue, id, and sprite
    position: A list [x, y] of the upper left hand corner coordinates of the Container's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this Container
    capacity: A floating point value, the maximum amount of contents which this Container can hold
    residue: A floating point value in range [0-1], the percentage of this Container's capacity
        which will be left behind when the contents of this Container are poured out.
    sprite: A P5 image file used to display this piece of Container
    */
    constructor(position, size, mass, capacity, residue, sprite){
        super(position, size, mass, sprite);
        this.capacity = capacity;
        this.residue = residue;

        // The list of Chemicals in this Container
        this.contents = [];
    }

    /**
    Set the Chemical contents of this Container.
    contents: The new contents, a single chemical, or a list of Chemicals, can be an empty list or null, null will set an empty list
    */
    setContents(contents){
        this.contents = (contents === null) ? [] : contents;
        if(!Array.isArray(this.contents)) this.contents = [this.contents];
    }

    /**
    Get the mass of all the combined Chemicals in this Container
    returns: The mass total
    */
    getTotalContentsMass(){
        var total = 0;
        for(var i = 0; i < this.contents.length; i++){
            total += this.contents[i].mass;
        }
        return total;
    }

    /**
    Get the mass of this Container combined with all chemicals in the container
    */
    getTotalMass(){
        return this.mass + this.getTotalContentsMass();
    }

    /**
    Determine if there are no contents in this Container
    returns: true if there are no contents in this Container, false otherwise
    */
    isEmpty(){
        return this.getTotalContentsMass() === 0;
    }

    /**
    Set the capacity of this Container
    capacity: The new capacity, a floating point value
    */
    setCapacity(capacity){
        this.capacity = capacity;
    }

    /**
    Set the residue of this Container
    capacity: The new residue, a floating point value in range [0-1]
    */
    setResidue(residue){
        this.residue = residue;
    }
}


// Constants for identifying which functions have which ids
let ID_FUNC_CONTAINER_POUR_INTO = 1;
let ID_FUNC_CONTAINER_ADD_TO = 2;

/**
A class for handling controlling a Container in a 2D environment
*/
class ContainerController2D extends EquipmentController2D{
    /**
    Create a new ContainerController to control the given Container
    container: The Container which this Controller will control
    */
    constructor(container){
        super(container);
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    returns: The function of the id
    */
    idToFunc(id){
        switch(id){
            case ID_FUNC_CONTAINER_POUR_INTO: return this.pourInto;
            case ID_FUNC_CONTAINER_ADD_TO: return this.addTo;
            default: return null;
        }
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    returns: The id of the function
    */
    funcToId(func){
        switch(func){
            case this.pourInto: return ID_FUNC_CONTAINER_POUR_INTO;
            case this.addTo: return ID_FUNC_CONTAINER_ADD_TO;
            default: return null;
        }
    }

    /**
    Get a list of all possible functions which this ContainerController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Pour Into", "Add To"];
    }

    /**
    Determine if this Controller's Container only has residue left.
    To have residue, there must be only one chemical remaining, and it must take up less than the
    residue percentage of this Controller's Container's capacity
    returns: true if there is residue, false otherwise
    */
    hasResidue(){
        let eq = this.equipment;
        if(eq.contents.length !== 1) return false;
        return eq.residue * eq.capacity >= eq.getTotalContentsMass();
    }

    /**
    Check to see if there is any mass remaining in this Controller's Container's contents.
    If any the contents have zero mass, remove that contents
    returns: true if contents were removed, false otherwise
    */
    checkForMass(){
        let eq = this.equipment;
        let cont = eq.contents;
        // Remove all contents with zero mass
        var removed = false;
        for(var i = 0; i < cont.length; i++){
            if(cont[i].mass === 0){
                cont.splice(i, 1);
                i--;
                removed = true;
            }
        }
        return removed;
    }

    /**
    Pour the contents of this Controller's Container into the given Controller's Container. This will leave residue inside this Controller's Container.
    If the contents of this Controller's Container do not fit in the given Controller's Container, then as much as can fit will be poured, Beginning with chemicals first in the list
    contControl: The ContainerController in which to pour this Controller's Container's contents
    */
    pourInto(contControl){
        if(this.equipment !== null && contControl !== null){
            let chems = this.pourOut(this.maxPourAmount(contControl));
            for(var i = 0; i < chems.length && this.hasSpace(chems[i]); i++){
                contControl.addTo(new ChemicalController2D(chems[i]));
            }
        }
    }

    /**
    By hand, pour out the contents of this Controller's Container. This will leave residue inside the Container.
    Cannot pour out if this Controller's Container only has residue thus not enough of a Chemical to pour out, or if it is empty.
    amount: The amount to pour out of this Controller's Container. Use a negative number to pour out everything. Default -1
        If the amount specified is greater than the amount in this Controller's Container, all contents are poured out.
        The amount poured out begins with the Chemicals at the beginning of the list
    return: The Chemicals poured out of this Controller's Container, or an empty list if no Chemical could be poured out
    */
    pourOut(amount = -1){
        // Do not pour out anything if the remaining contents is less than the residue percent
        //  and do nothing if this Controller's Container is empty
        let eq = this.equipment;
        if(this.hasResidue() || eq.isEmpty()) return [];

        // If the amount is negative, set it to the entire contents
        if(amount === -1) amount = eq.capacity;

        // Otherwise, pour out based on residue percentage
        var total = 0;
        var newAmount = 0;
        let chemControl = new ChemicalController2D(null);
        let chems = [];
        for(var i = 0; i < eq.contents.length && total < amount; i++){
            chemControl.setChemical(eq.contents[i]);
            let chem = chemControl.chemical;
            let m = chem.mass;
            let useMore = total + m < amount && i + 1 != eq.contents.length;
            newAmount = (useMore) ? m : amount - total;

            // Determine the percentage of Chemical to leave in the Container
            var leavePercent = 1 - ((newAmount >= m) ? 1 : newAmount / m);
            // If the percentage to leave is less than the residue, then leave only residue
            if(leavePercent < eq.residue) leavePercent = eq.residue;
            if(useMore) leavePercent = 0;

            let splitChem = chemControl.split(leavePercent);
            chems.push(splitChem);
            total += splitChem.mass;
        }
        this.checkForMass();

        return chems;
    }

    /**
    Add a copy of the given Controller's Chemical to this Controller's Container.
    Does nothing if the Chemical cannot be placed in this Controller's Container.
    chemControl: The Controller who's Chemical will be placed in this container
    returns: true if the Controller's Chemical was successfully added, false otherwise
    */
    addTo(chemControl){
        if(chemControl === null) return false;
        let chem = chemControl.copyChem();
        let copyControl = new ChemicalController2D(chem);
        let eq = this.equipment;

        if(this.canContain(chem) && this.hasSpace(chem)){
            if(eq.isEmpty()){
                eq.setContents([chem]);
            }
            else{
                eq.setContents(copyControl.combine(this.equipment.contents));
                this.checkForMass();
            }
            return true;
        }
        return false;
    }

    /**
    Clear all of the contents of this Controller's Container, leaving no residue
    returns: The contents removed, can be an empty list if the Container is already empty
    */
    emptyOut(){
        let eq = this.equipment;
        var chems = eq.contents;
        eq.setContents(null);
        return chems;
    }

    /**
    Determine if this Controller's Container can hold more of a new Chemical
    chem: The new Chemical to add
    returns: true if the Chemical is within the remaining capacity of the Container, false otherwise
    */
    hasSpace(chem){
        if(this.hasResidue()) return true;
        let eq = this.equipment;
        let cont = eq.contents;
        var mass = eq.getTotalContentsMass() + ((chem === null) ? 0 : chem.mass);
        return mass <= eq.capacity;
    }

    /**
    Get the amount of space left in this Controller's Container
    returns: The amount of space which can still hold more Chemicals
    */
    remainingSpace(){
        let eq = this.equipment;
        return eq.capacity - eq.getTotalContentsMass();
    }

    /**
    Determine how much of the contents of this Controller's Container can be put into the given Controller's Container.
    contControl: the Controller to check
    returns: The mass which can be put into the given Controller's Container, or null if this Controller's Container is empty
    */
    maxPourAmount(contControl){
        let eq = this.equipment;
        if(eq === null || contControl === null || contControl.equipment === null) return null;
        let cont = eq.contents;
        if(cont.length < 1) return null;

        var maxSpace = contControl.remainingSpace();
        var totalMass = eq.getTotalContentsMass();
        return (totalMass <= maxSpace) ? totalMass : maxSpace;
    }

    /**
    Determine if this Controller's Container can hold the given Chemical.
    chemical: The Chemical which should be tested
    returns: true if the Container can hold the Chemical, false otherwise
    */
    canContain(chemical){
        throw new Error("All ContainerController2D objects must implement canContain(chemical)");
    }

    /**
    Reset the Container of this Controller by removing all of its contents
    */
    reset(){
        this.emptyOut();
    }

    /**
    Update the state of this Controller's Container by one frame in the simulation.
    Override this method to have events happen in sub containers.
    */
    update(){
        super.update();
    }

}