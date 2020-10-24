/**
An abstract class used for defining an Equipment which can dispose of Equipment or Chemicals
*/
class Disposer extends Equipment{
    /**
    Create a new Disposer with the given position, mass, and sprite
    position: A list [x, y] of the upper left hand corner coordinates of the Equipment's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this piece of Equipment
    sprite: A P5 image file used to display this Disposer
    */
    constructor(position, size, mass, sprite){
        super(position, size, mass, sprite);
    }
}

// The ID for a Disposer to dispose of it's contents
ID_FUNC_DISPOSER_DISPOSE = 1;

/**
An abstract class used for controlling a Disposer in a 2D environment
*/
class DisposerController2D extends EquipmentController2D{

    /**
    Create a Controller for controlling Disposers
    */
    constructor(disposer){
        super(disposer);
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    returns: The function of the ID, or null if an invalid ID was given
    */
    idToFunc(id){
        switch(id){
            case ID_FUNC_DISPOSER_DISPOSE: return this.dispose;
            default: return null;
        }
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    returns: The id of the function, or null if an invalid function was given
    */
    funcToId(func){
        switch(id){
            case this.dispose: return ID_FUNC_DISPOSER_DISPOSE;
            default: return null;
        }
    }

    /**
    Dispose of the given ExperimentObjectController2D's Object
    objControl: The Controller with the object to dispose
    returns: true if the object was successfully disposed, false otherwise
    This always throws an error, as sub classes must implement this method
    */
    dispose(objControl){
        throw new Error("All DisposerController2D objects must implement dispose");
    }

}