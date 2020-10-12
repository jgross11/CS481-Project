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