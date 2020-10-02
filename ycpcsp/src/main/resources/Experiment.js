/**
An object used to keep track of all of the components in an experiment
*/
class Experiment{

    /**
    Create an empty experiment with the given title and creator name.
    title: A string, the title of this Experiment
    creator: A string, the name of the creator of this Experiment
    */
    constructor(title, creator){
        // The list of EquipmentControllers in this Experiment
        this.equipment = [];

        this.title = title;
        this.creator = creator;
    }

    /**
    Set the current list of EquipmentControllers used by this Experiment.
    Also updates the list keeping track of equipment types
    equipment: The list of EquipmentControllers to set for this Experiment
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }

    /**
    Set the title of this Experiment
    */
    setTitle(title){
        this.title = title;
    }

    /**
    Set the creator name of this Experiment
    */
    setCreator(creator){
        this.creator = creator;
    }

}