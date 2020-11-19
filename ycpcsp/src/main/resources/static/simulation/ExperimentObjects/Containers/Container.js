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
    returns: The mass total in grams
    */
    getTotalContentsMass(){
        var total = 0;
        for(var i = 0; i < this.contents.length; i++){
            total += this.contents[i].getMass();
        }
        return total;
    }

    /**
    Get the volume of all the combined Chemicals in this Container
    returns: The volume total in milliliters
    */
    getTotalContentsVolume(){
        var total = 0;
        for(var i = 0; i < this.contents.length; i++){
            total += this.contents[i].getVolume();
        }
        return total;
    }

    /**
    Get the mass of this Container combined with all chemicals in the container
    */
    getTotalMass(){
        return this.getMass() + this.getTotalContentsMass();
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
let ID_FUNC_CONTAINER_EMPTY_IN_TRASH = 3;

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
            case ID_FUNC_CONTAINER_EMPTY_IN_TRASH: return this.emptyOut;
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
            case this.emptyOut: return ID_FUNC_CONTAINER_EMPTY_IN_TRASH;
            default: return null;
        }
    }

    /**
    Based on the given temperature, set the temperature of all Chemicals inside this Controller's Container.
    Also updates their states of matter.
    temp: The temperature to set to
    */
    updateContentsTemperature(temp){
        let cont = this.equipment.contents;
        let chemControl = new ChemicalController2D(null);
        for(var i = 0; i < cont.length; i++){
            cont[i].setTemperature(temp);
            chemControl.setChemical(cont[i]);
            chemControl.calculateMatterState();
        }
    }

    /**
    Get a list of all possible functions which this ContainerController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Pour Into", "Add To", "Dispose Contents in Trash"];
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
            if(cont[i].getMass() === 0){
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
    return: true if the Chemicals could be poured into the Controller, false otherwise
    */
    pourInto(contControl){
        // Only pour if the parameter is a valid type
        if(!(contControl instanceof ContainerController2D)) return false;

        // Check that relevant objects are not null
        if(this.equipment !== null && contControl !== null){
            // Get the Chemicals which will be poured out of this Controller's Container
            let chems = this.pourOut(this.maxPourAmount(contControl));
            for(var i = 0; i < chems.length && contControl.hasSpace(chems[i]); i++){
                contControl.addTo(new ChemicalController2D(chems[i]));
            }
            return true;
        }
        return false;
    }

    /**
    By hand, pour out the contents of this Controller's Container. This will leave residue inside the Container.
    Cannot pour out if this Controller's Container only has residue thus not enough of a Chemical to pour out, or if it is empty.
    amount: The amount, in milliliters, to pour out of this Controller's Container. Use a negative number to pour out everything. Default -1
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
        for(var i = eq.contents.length - 1; i >= 0 && total < amount; i--){
            chemControl.setChemical(eq.contents[i]);
            let chem = chemControl.chemical;
            let v = chem.getVolume();
            // Check if residue should be left after chemicals are removed
            let useMore = total + v < amount && i + 1 != eq.contents.length;
            newAmount = useMore ? v : amount - total;

            // Determine the percentage of Chemical to leave in the Container
            var leavePercent = 1 - ((newAmount >= v) ? 1 : newAmount / v);
            // If the percentage to leave is less than the residue, then leave only residue
            if(leavePercent < eq.residue) leavePercent = eq.residue;
            // If more Chemicals will be added, leave none of the current Chemical
            if(useMore) leavePercent = 0;

            let splitChem = chemControl.split(leavePercent);
            chems.push(splitChem);
            total += splitChem.getVolume();
        }
        this.checkForMass();

        return chems;
    }

    /**
    Add a copy of the given Controller's Chemical to this Controller's Container.
    Does nothing if the Chemical cannot be placed in this Controller's Container.
    If the Chemical overflows the container, the densest chemicals will fall out and be removed
    chemControl: The Controller who's Chemical will be placed in this container
    returns: true if the Controller's Chemical was successfully added, false otherwise
    */
    addTo(chemControl){
        // Checking that parameters are valid
        if(chemControl === null) return false;
        if(!(chemControl instanceof ChemicalController2D)) return false;

        // Convenience constants
        let chem = chemControl.chemical.copyChem();
        let copyControl = new ChemicalController2D(chem);
        let eq = this.equipment;

        // Only add the chemical if this Controller's Container is allowed to hold the Chemical, and has space for it
        if(this.canContain(chem) && this.hasSpace(chem)){
            if(eq.isEmpty()){
                eq.setContents([chem]);
            }
            else{
                eq.setContents(copyControl.combine(this.equipment.contents));
                this.checkForMass();
            }

            this.removeOverflow();

            return true;
        }
        return false;
    }

    /**
    If any of the Chemicals in this Controller's Container's contents can be combined to a solution, do so
    returns: true if a solution was made, false otherwise
    */
    checkForSolutions(){
        // Find all water soluble chemicals, less than one exists, return false
        let cs = [];
        let conts = this.equipment.contents;
        let indexes = [];
        for(var i = 0; i < conts.length; i++){
            if(conts[i].getWaterSolubility()){
                cs.push(conts[i]);
                indexes.push(i);
            }
        }
        if(cs.length < 2) return false;

        // If they are, create a solution from the contents, using the least dense Chemical as the solute
        //  The least dense chemical is assumed to be at the end of the list
        let solute = cs[cs.length - 1];
        cs.splice(cs.length - 1, 1);
        let solution = new ChemicalSolution(solute, cs);

        // Remove all Chemicals used for the solution from the
        for(var i = cs.length - 1; i >= 0; i--){
            conts.splice(i, 1);
        }

        // Add the solution
        conts.push(solute);
        return true;
    }

    /**
    If any Chemicals in this Controller's Container's contents exceeds its capacity, remove Chemicals, beginning with
        the least dense Chemicals, until there is no more overflow.
    returns: The removed Chemicals as a list of Chemical objects
    */
    removeOverflow(){
        let removed = [];
        let eq = this.equipment;
        var i = eq.contents.length - 1;
        // Keep looping while contents are overflowing
        while(eq.getTotalContentsVolume() > eq.capacity && i >= 0){
            var total = eq.getTotalContentsVolume();
            var vol = eq.contents[i].getVolume();
            // If the Chemical completely overflows, remove that Chemical
            if(total - vol > eq.capacity){
                removed.push(eq.contents[eq.contents.length - 1]);
                eq.contents.splice(eq.contents.length - 1, 1);
            }
            // Otherwise, remove the correct amount of the chemical to fit to the max capacity
            else{
                var removeAmount = total - eq.capacity;
                eq.contents[i].addVolume(-removeAmount);
                var chemControl = new ChemicalController2D(eq.contents[i]);
                var removedChem = chemControl.chemical.copyChem();
                removedChem.setVolume(removeAmount);
                removed.push(removedChem);
                break;
            }
            i--;
        }
        return removed;
    }

    /**
    Beginning with the least dense chemicals, remove the given amount of volume
    volume: The amount to remove, a positive number
    */
    removeVolume(volume){
        let eq = this.equipment;
        // Continue to loop until the volume is removed, or no more chemicals exist
        while(volume > 0 && eq.contents.length > 0){
            let c = eq.contents[eq.contents.length - 1];
            let cv = c.getVolume();
            // If the volume of the least dense Chemical is less than the volume remaining to be removed, them remove the entire Chemical.
            if(cv < volume){
                volume -= cv;
                eq.contents.splice(eq.contents.length - 1, 1);
            }
            // Otherwise, remove that amount of volume from the Chemical
            else{
                c.addVolume(-volume);
                break;
            }
        }
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
        let eq = this.equipment;
        var volume = eq.getTotalContentsVolume() + ((chem === null) ? 0 : chem.getVolume());
        return volume <= eq.capacity;
    }

    /**
    Get the amount of space left in this Controller's Container
    returns: The amount of space which can still hold more Chemicals
    */
    remainingSpace(){
        let eq = this.equipment;
        return eq.capacity - eq.getTotalContentsVolume();
    }

    /**
    Determine how much of the contents of this Controller's Container can be put into the given Controller's Container.
    contControl: the Controller to check
    returns: The volume in milliliters which can be put into the given Controller's Container, or null if this Controller's Container is empty
    */
    maxPourAmount(contControl){
        let eq = this.equipment;
        if(eq === null || contControl === null || contControl.equipment === null) return null;
        let cont = eq.contents;
        if(cont.length < 1) return null;

        var maxSpace = contControl.remainingSpace();
        var totalVolume = eq.getTotalContentsVolume();
        return (totalVolume <= maxSpace) ? totalVolume : maxSpace;
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
    Determine if the given Chemical can be placed in this container without changing the overall contents.
    chemical: The chemical to test
    returns: true if this container is empty, or contains exactly one chemical which is the smae type as the given chemical
    */
    placeSameChemical(chemical){
        let eq = this.equipment;
        return eq.isEmpty() || eq.contents[0].getID() === chemical.getID();
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

    /**
    Draw the contents of this container as a rectangle based on the position and size of this Controller's Container
    graphics: The P5 graphics object to use to draw
    xOffset: The percentage of the width of this object to offset the rectangle on the x axis
    yOffset: The percentage of the height of this object to offset the rectangle on the y axis
    widthFactor: The percentage of the width of the container for the rectangle
    heightFactor: The percentage of the height of the container for the rectangle
    */
    drawContentsRect(graphics, xOffset, yOffset, widthFactor, heightFactor){
        let eq = this.equipment;
        let w = this.width();
        let h = this.height();
        drawChemicalRectMultiple(graphics, eq.contents, eq.capacity,
            this.x() + w * xOffset, this.y() + h * yOffset, w * widthFactor, h * heightFactor);
    }

}