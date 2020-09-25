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
    By hand, pour out the contents of this Container. This will leave residue inside the container.
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
        if(this.canContain(chemical)){
            if(this.equipment.contents === null) this.equipment.setContents(chemical);
            else{
                let t1 = this.equipment.contents.texture;
                let t2 = chemical.texture;
                this.equipment.contents.texture = [
                    (t1[0] + t2[0]) / 2, (t1[1] + t2[1]) / 2, (t1[2] + t2[2]) / 2
                ];
            }
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
        throw new Error("All ContainerController2D objects must implement canContain(chemical)");
    }

}