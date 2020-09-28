/**
A class for handling controlling a Container in a 2D environment
*/
class ContainerController2D extends EquipmentController2D{
    /**
    Create a new ContainerController to control the given container
    container: The Container which this controller will control
    */
    constructor(container){
        super(container);
    }

    /**
    Determine if this Container only has residue left
    returns: true if there is residue, false otherwise
    */
    hasResidue(){
        let eq = this.equipment;
        if(eq.contents === null) return false;
        return eq.residue * eq.capacity >= eq.contents.mass;
    }

    /**
    Check to see if there is any mass remaining in this Container's contents.
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
    Pour the contents of this ContainerController into the given ContainerController. This will leave residue inside the ContainerController.
    If the contents of this ContainerController do not fit in the given ContainerController, then as much as can fit will be poured
    container: The ContainerController in which to pour this containers contents
    */
    pourInto(container){
        if(this.equipment !== null && container !== null){
            let chem = this.pourOut(this.maxPourAmount(container));
            container.addTo(chem);
        }
    }

    /**
    By hand, pour out the contents of this Container. This will leave residue inside the container.
    Cannot pour out if this container only has residue and not enough of a Chemical to pour out, or if it is empty.
    amount: The amount to pour out of the container. Use a negative number to pour out everything. Default -1
        If the amount specified is greater than the amount in the container, all contents is poured out.
    return: The Chemical poured out of this Container, or null if no chemical could be poured out
    */
    pourOut(amount = -1){
        // Do not pour out anything if the remaining contents is less than the residue percent
        //  and do nothing if this container is empty
        let eq = this.equipment;
        if(this.hasResidue() || eq.contents === null) return null;

        // Otherwise, pour out based on residue percentage
        let chemController = new ChemicalController2D(eq.contents);

        // Determine the percentage of chemical to leave in the container
        var leavePercent = 1 - ((amount < 0 || amount >= eq.contents.mass) ? 1 : amount / eq.contents.mass);
        // If the percentage to leave is less than the residue, then leave only residue
        if(leavePercent < eq.residue) leavePercent = eq.residue;

        var splitChem = chemController.split(leavePercent);
        this.checkForMass();

        return splitChem;
    }

    /**
    Add the given chemical to this container. Does nothing if the chemical cannot be placed in this container.
    chemical: The chemical to be placed in this container
    returns: true if the chemical was successfully added, false otherwise
    */
    addTo(chemical){
        if(this.canContain(chemical) && this.hasSpace(chemical)){
            if(this.equipment.contents === null) this.equipment.setContents(chemical);
            else{
                var chemController = new ChemicalController2D(this.equipment.contents);
                chemController.combine(chemical);
                this.checkForMass();
            }
            return true;
        }
        return false;
    }

    /**
    Clear all of the contents of the Container in this Controller.
    returns: The contents removed, can be null if this container is already empty
    */
    emptyOut(){
        let eq = this.equipment;
        var chem = eq.contents;
        eq.setContents(null);
        return chem;
    }

    /**
    Determine if this Container can hold more of a new Chemical
    chem: The new Chemical to add
    returns: true if the Chemical is within the remaining capacity of this Container, false otherwise
    */
    hasSpace(chem){
        if(this.hasResidue()) return true;
        let eq = this.equipment;
        let cont = eq.contents;
        var mass = ((cont === null) ? 0 : cont.mass) + ((chem === null) ? 0 : chem.mass);
        return mass <= eq.capacity;
    }

    /**
    Get the amount of space left in this container
    returns: The amount of space which can still hold more Chemicals
    */
    remainingSpace(){
        let eq = this.equipment;
        var amount = (eq.contents === null) ? 0 : eq.contents.mass
        return eq.capacity - amount;
    }

    /**
    Determine how much of the contents of this Container can be put into the given Container.
    container: the chemical to check
    returns: The mass which can be put into the given Container, or null if this Container is empty
    */
    maxPourAmount(container){
        let cont = this.equipment.contents;
        if(cont === null) return null;

        var maxSpace = container.remainingSpace();
        return (cont.mass <= maxSpace) ? cont.mass : maxSpace;
    }

    /**
    Determine if this container can hold the given chemical.
    chemical: The Chemical which should be tested
    returns: true if the container can hold the chemical, false otherwise
    */
    canContain(chemical){
        throw new Error("All ContainerController2D objects must implement canContain(chemical)");
    }

}