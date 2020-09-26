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
    Pour the contents of this container into the given container
    container: The container in which to pour this containers contents
    */
    pourInto(container){
        if(this.equipment !== null && container !== null && container.hasSpace(this.equipment.contents)){
            let chem = this.pourOut();
            container.addTo(chem);
        }
    }

    /**
    By hand, pour out the contents of this Container. This will leave residue inside the container.
    TODO add residue remnants
    return: The Chemical poured out of this Container
    */
    pourOut(){
        let chem = this.equipment.contents;
        this.equipment.setContents(null);
        return chem;
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
        let cont = this.equipment.contents;
        var mass = ((cont === null) ? 0 : cont.mass) + ((chem === null) ? 0 : chem.mass);
        return mass <= this.equipment.capacity;
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