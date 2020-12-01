/**
The abstract class representing a generic object which can exist in an Experiment
*/
class ExperimentObject{

    /**
    Create a new ExperimentObject with the given mass and name.
    mass: A floating point value, the mass, in grams, of this object.
    */
    constructor(mass){
        this.mass = mass;
    }

    /**
    Set the mass of this ExperimentObject
    mass: The new mass, a positive floating point value
    */
    setMass(mass){
        if(!isFloat(mass)) return;
        this.mass = (mass < 0) ? 0 : mass;
    }

    /**
    Get the mass of this ExperimentObject
    returns: The mass
    */
    getMass(){
        return this.mass;
    }

    /**
    Add some mass to the current mass of this ExperimentObject
    mass: The mass to add in grams
    */
    addMass(mass){
        this.setMass(this.mass + mass);
    }

    /**
    Get the ID representing this ExperimentObject
    */
    getID(){
        throw new Error("All ExperimentObject objects must implement getID");
    }

}


/**
An abstract class to handle operations on ExperimentObjects
*/
class ExperimentObjectController2D{

    /**
    Empty Constructor for a default abstract ExperimentObjectController2D object
    */
    constructor(){}

    /**
    Get the ExperimentObject controlled by this Controller
    Always throws an error, instances of this object must implement this method.
    */
    getObject(){
        throw new Error("All ExperimentObjectController2D objects must implement getObject");
    }

    /**
    Determine if this Controller's ExperimentObject can be placed down on its own
    Always throws an error, instances of this object must implement this method.
    */
    canPlace(){
        throw new Error("All ExperimentObjectController2D objects must implement canPlace");
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    Always throws an error, instances of this object must implement this method.
    */
    idToFunc(id){
        throw new Error("All ExperimentObjectController2D objects must implement idToFunc");
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    Always throws an error, instances of this object must implement this method.
    */
    funcToId(func){
        throw new Error("All ExperimentObjectController2D objects must implement funcToId");
    }

    /**
    Get a list of all possible functions which this ExperimentObjectController can perform.
    The list must be in the same order as the function ids. For example, if this ExperimentObjectController has
    3 functions, make, add, and destroy, with function ids 1, 2, and 3 respectively, then this method
    should return a list of 3 strings, first describing make, then add, and then destroy
    returns: the list of strings
    */
    getFuncDescriptions(){
        throw new Error("All ExperimentObjectController2D objects must implement getFuncDescriptions");
    }

}