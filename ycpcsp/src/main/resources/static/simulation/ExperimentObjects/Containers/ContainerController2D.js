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
            case 2: return this.addTo;
            case 1: return this.pourInto;
        }
    }

    /**
    Determine if this Controller's Container only has residue left
    returns: true if there is residue, false otherwise
    */
    hasResidue(){
        let eq = this.equipment;
        if(eq.contents === null) return false;
        return eq.residue * eq.capacity >= eq.contents.mass;
    }

    /**
    Check to see if there is any mass remaining in this Controller's Container's contents.
    If the contents have zero mass, set the contents to null
    returns: true if contents were set to null, false otherwise
    */
    checkForMass(){
        let cont = this.equipment.contents;
        if(cont !== null && cont.mass === 0){
            this.emptyOut();
            return true;
        }
        return false;
    }

    /**
    Pour the contents of this Controller's Container into the given Controller's Container. This will leave residue inside this Controller's Container.
    If the contents of this Controller's Container do not fit in the given Controller's Container, then as much as can fit will be poured
    contControl: The ContainerController in which to pour this Controller's Container's contents
    */
    pourInto(contControl){
        if(this.equipment !== null && contControl !== null){
            let chem = this.pourOut(this.maxPourAmount(contControl));
            contControl.addTo(new ChemicalController2D(chem));
        }
    }

    /**
    By hand, pour out the contents of this Controller's Container. This will leave residue inside the Container.
    Cannot pour out if this Controller's Container only has residue thus not enough of a Chemical to pour out, or if it is empty.
    amount: The amount to pour out of this Controller's Container. Use a negative number to pour out everything. Default -1
        If the amount specified is greater than the amount in this Controller's Container, all contents are poured out.
    return: The Chemical poured out of this Controller's Container, or null if no Chemical could be poured out
    */
    pourOut(amount = -1){
        // Do not pour out anything if the remaining contents is less than the residue percent
        //  and do nothing if this Controller's Container is empty
        let eq = this.equipment;
        if(this.hasResidue() || eq.contents === null) return null;

        // Otherwise, pour out based on residue percentage
        let chemController = new ChemicalController2D(eq.contents);

        // Determine the percentage of Chemical to leave in the Container
        var leavePercent = 1 - ((amount < 0 || amount >= eq.contents.mass) ? 1 : amount / eq.contents.mass);
        // If the percentage to leave is less than the residue, then leave only residue
        if(leavePercent < eq.residue) leavePercent = eq.residue;

        var splitChem = chemController.split(leavePercent);
        this.checkForMass();

        return splitChem;
    }

    /**
    Add a copy of the given Controller's Chemical to this Controller's Container. Does nothing if the Chemical cannot be placed in this Controller's Container.
    chemControl: The Controller who's Chemical will be placed in this container
    returns: true if the Controller's Chemical was successfully added, false otherwise
    */
    addTo(chemControl){
        let chem = chemControl.copyChem();
        let copyControl = new ChemicalController2D(chem);

        if(this.canContain(chem) && this.hasSpace(chem)){
            if(this.equipment.contents === null){
                this.equipment.setContents(chem);
            }
            else{
                var thisChemControl = new ChemicalController2D(this.equipment.contents);
                thisChemControl.combine(copyControl);
                this.checkForMass();
            }
            return true;
        }
        return false;
    }

    /**
    Clear all of the contents of this Controller's Container, leaving no residue
    returns: The contents removed, can be null if the Container is already empty
    */
    emptyOut(){
        let eq = this.equipment;
        var chem = eq.contents;
        eq.setContents(null);
        return chem;
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
        var mass = ((cont === null) ? 0 : cont.mass) + ((chem === null) ? 0 : chem.mass);
        return mass <= eq.capacity;
    }

    /**
    Get the amount of space left in this Controller's Container
    returns: The amount of space which can still hold more Chemicals
    */
    remainingSpace(){
        let eq = this.equipment;
        var amount = (eq.contents === null) ? 0 : eq.contents.mass
        return eq.capacity - amount;
    }

    /**
    Determine how much of the contents of this Controller's Container can be put into the given Controller's Container.
    contControl: the Controller to check
    returns: The mass which can be put into the given Controller's Container, or null if this Controller's Container is empty
    */
    maxPourAmount(contControl){
        let eq = this.equipment;
        if(eq === null) return null;
        let cont = eq.contents;
        if(cont === null || contControl === null) return null;

        var maxSpace = contControl.remainingSpace();
        return (cont.mass <= maxSpace) ? cont.mass : maxSpace;
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

}