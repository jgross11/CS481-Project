/**
An abstract class to handle operations on experiment objects
*/
class ExperimentObjectController2D{

    constructor(){
    }

    getObject(){
        throw new Error("All ExperimentObjectController2D objects must implement getObject");
    }

}