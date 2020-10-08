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
    */
    getObject(){
        throw new Error("All ExperimentObjectController2D objects must implement getObject");
    }

    /**
    Determine if this Controller's ExperimentObject can be placed down on its own
    returns: true if the ExperimentObject can be placed down, false otherwise
    */
    canPlace(){
        throw new Error("All ExperimentObjectController2D objects must implement canPlace");
    }

}