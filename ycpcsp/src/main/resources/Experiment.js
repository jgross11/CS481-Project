/**
An object used to keep track of all of the components in an experiment
*/
class Experiment{

    /**
    Create an empty experiment.
    */
    constructor(){
        // The list of Equipment in this Experiment
        this.equipment = [];
        var controller = new ExperimentController2D(this);
        controller.reset();
    }

    /**
    Set the current list of Equipment used by this Experiment
    equipment: The list of Equipment to set for this Experiment
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }
}