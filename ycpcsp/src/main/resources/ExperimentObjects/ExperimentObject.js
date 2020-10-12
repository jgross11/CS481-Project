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
}