/**
A class representing a Trashcan used to dispose of Chemicals
*/
class Trashcan extends Disposer{

    /**
    Create a new Trashcan, used for disposing of Chemicals
    */
    constructor(){
        super([0, 0], [75, 125], 100, SPRITE_TRASH_CAN);
    }

    getID(){
        return ID_EQUIP_TRASHCAN;
    }

}

/**
A Controller used for controlling a Trashcan
*/
class TrashcanController2D extends DisposerController2D{

    /**
    Make a new Controller used for Controlling a Trashcan
    */
    constructor(trashcan){
        super(trashcan);
    }

    /**
    Dispose of a Chemical in this trashcan
    chemControl: The Chemical to dispose of, must be a ChemicalController2D
    returns: true if the chemical was disposed, false otherwise
    */
    dispose(chemControl){
        chemControl.setMass(0);
    }

}