/**
The abstract class representing a generic object which can exist in an Experiment
*/
class ExperimentObject{

    /**
    Create a new ExperimentObject with the given mass and name.
    mass: A floating point value, the mass, in grams, of this object. TODO should mass be in grams?
    name: As a string, the name given to this specific instance of ExperimentObject
    */
    constructor(mass, name){
        this.mass = mass;
        this.name = name;
    }



}