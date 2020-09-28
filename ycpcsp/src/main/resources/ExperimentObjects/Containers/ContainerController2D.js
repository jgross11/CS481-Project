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
            this.equipment.setContents(null);
            return true;
        }
        return false;
    }

    /**
    Pour the contents of this container into the given container. This will leave residue inside the container.
    container: The container in which to pour this containers contents
    */
    pourInto(container){
        if(this.equipment !== null && container !== null && container.hasSpace(this.equipment.contents)){
            let chem = this.pourOut();
            container.addTo(chem);
            this.checkForMass();
        }
    }

    /**
    By hand, pour out the contents of this Container. This will leave residue inside the container.
    return: The Chemical poured out of this Container, or null if no chemical could be poured out
    */
    pourOut(){
        // Do not pour out anything if the remaining contents is less than the residue percent
        if(this.hasResidue()) return null;

        // Otherwise, pour out based on residue percentage
        let eq = this.equipment;
        let chemController = new ChemicalController2D(eq.contents);

        var splitChem = chemController.split(eq.residue);
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
            }
            return true;
        }
        return false;

    }

    /**
    Determine if this container can hold more of a new chemical
    chem: The new chemical to add
    returns: true if the chemical is within the remaining capacity of this Container, false otherwise
    */
    hasSpace(chem){
        if(this.hasResidue()) return true;
        let eq = this.equipment;
        let cont = eq.contents;
        var mass = ((cont === null) ? 0 : cont.mass) + ((chem === null) ? 0 : chem.mass);
        return mass <= eq.capacity;
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