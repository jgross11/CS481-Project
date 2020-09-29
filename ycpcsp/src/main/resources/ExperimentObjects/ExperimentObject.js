/**
The abstract class representing a generic object which can exist in an Experiment
*/
class ExperimentObject{

    /**
    Create a new ExperimentObject with the given mass and id.
    mass: A floating point value, the mass, in grams, of this object. TODO should mass be in grams?
    instanceID: A unique integer specifying this ExperimentObject
    */
    constructor(mass, instanceID){
        this.mass = mass;
        this.instanceID = instanceID;
    }

    /**
    Set the mass of this ExperimentObject
    mass: The new mass, a positive floating point value
    */
    setMass(mass){
        if(isFloat(mass) && mass >= 0) this.mass = mass;
    }

    /**
    Set the id of this ExperimentObject
    instanceID: The new id
    */
    setInstanceID(instanceID){
        this.instanceID = instanceID;
    }

}