/**
The abstract class representing a generic object which can exist in an Experiment
*/
class ExperimentObject{

    /**
    Create a new ExperimentObject with the given mass and name.
    mass: A floating point value, the mass, in grams, of this object. TODO should mass be in grams?
    */
    constructor(mass){
        this.mass = mass;
    }

    /**
    Set the mass of this ExperimentObject
    mass: The new mass, a positive floating point value
    */
    setMass(mass){
        if(isFloat(mass) && mass >= 0) this.mass = mass;
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

}