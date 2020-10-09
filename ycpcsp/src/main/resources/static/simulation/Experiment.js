/**
An object used to keep track of all of the components in an Experiment
*/
class Experiment{

    /**
    Create an empty Experiment with the given title and creator name.
    title: A string, the title of this Experiment
    creator: A string, the name of the creator of this Experiment
    */
    constructor(title, creator){
        // The list of EquipmentControllers in this Experiment
        this.equipment = [];

        // The list of Chemicals used by this Experiment
        this.chemicals = [];

        // The instructions for running this Experiment
        this.instructions = []

        this.title = title;
        this.creator = creator;
    }

    /**
    Set the current list of EquipmentControllers used by this Experiment.
    equipment: The list of EquipmentControllers to set for this Experiment
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }

    /**
    Set the current list of Chemicals used by this Experiment.
    equipment: The list of Chemicals to set for this Experiment
    */
    setChemicals(chemicals){
        this.chemicals = chemicals;
    }

    /**
    Set the list of Instructions for use in this Experiment.
    Instructions determine the intended course of action for the Experiment.
    Instructions should bring the Experiment from beginning to end, one step at a time.
    instructions: the list of instructions
    */
    setInstructions(instructions){
        this.instructions = instructions;
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