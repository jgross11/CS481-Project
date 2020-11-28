/**
A class keeping track of a stir rod in experiments
*/
class StirRod extends Equipment{

    /**
    Create a new Weight Boat
    */
    constructor(){
        super([0, 0], [80, 80], 1, SPRITE_STIR_ROD);
    }

    /**
    Get the ID representing a stir rod
    */
    getID(){
        return ID_EQUIP_STIR_ROD;
    }
}

let ID_FUNC_STIR_ROD_STIR = 1;

/**
A controller to handle using a stir rod
*/
class StirRodController2D extends EquipmentController2D{

    /**
    Create a new StirRodController to control the given StirRod
    stirRod: The StirRod which this Controller will control
    */
    constructor(stirRod){
        super(stirRod);
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    */
    idToFunc(id){
        switch(id){
            case ID_FUNC_STIR_ROD_STIR: return this.stir;
            default: return null;
        }
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    */
    funcToId(func){
        switch(func){
            case this.stir: return ID_FUNC_STIR_ROD_STIR;
            default: return null;
        }
    }

    /**
    Get a list of the functions of a StirRod
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Stir"];
    }

    /**
    Reset this Container's StirRod. Currently StirRods do nothing on reset
    */
    reset(){
        super.reset();
    }

    /**
    Stir around the contents of the given Container's Controller
    contControl: The Controller with the container to stir
    returns: true if the object was stirred, false otherwise
    */
    stir(contControl){
        // StirRods can only stir Containers
        if(!(contControl instanceof ContainerController2D)) return false;
        return contControl.checkForSolutions();
    }

}