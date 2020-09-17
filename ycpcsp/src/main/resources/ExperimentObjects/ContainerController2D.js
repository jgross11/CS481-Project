/**
A class for handling controlling a Container in a 2D environment
*/
class ContainerController2D extends EquipmentController2D{
    /**
    Create a new ContainerController to control the given container
    container: The Container which this controller will control
    */
    constructor(container){
        this.container = container;
    }

    /**
    By hand, pour out the contents of this Container. This will leave residue inside the container
    */
    pourOut(){
        // TODO implement
    }

    /**
    Add the given chemical to this container. Does nothing if the chemical cannot be placed in this container.
    chemical: The chemical to be placed in this container
    returns: true if the chemical was successfully added, false otherwise
    */
    addTo(chemical){
        if(this.canContain(chemical)){
            // TODO implement add chemical
            return true;
        }
        return false;

    }

    /**
    Determine if this container can hold the given chemical.
    chemical: The Chemical which should be tested
    returns: true if the container can hold the chemical, false otherwise
    */
    canContain(chemical){
        throw new Error("All ContainerController objects must implement canContain(chemical)");
    }
}