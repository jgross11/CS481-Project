/**
A Controller used to control an experiment in a 2D space
*/
class ExperimentController2D{

    /**
    Create an empty Controller.
    */
    constructor(experiment){
        this.experiment = experiment;
        this.selectedEquipment = null;
    }

    /**
    Set the Experiment currently controller by this Controller
    experiment: The Experiment to set for this Controller
    */
    setExperiment(experiment){
        this.experiment = experiment;
    }

    /**
    Set the equipment which this controller has selected
    */
    setSelectedEquipment(selected){
        this.selectedEquipment = selected;
    }

    /**
    Bring the Experiment to its default state
    */
    reset(){
        this.equipment = [];
        this.selectedEquipment = null;
    }

    /**
    Bring the Experiment to the next step
    */
    runStep(){
        // TODO implement
    }

    /**
    Draw the full Experiment to the P5 graphics
    */
    render(){
        var exp = this.experiment;
        for(var i = 0; i < exp.equipment.length; i++){
            exp.equipment[i].draw();
        }
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        var exp = this.experiment;
        // If there is a selected object, unselect it
        if(this.selectedEquipment !== null){
            this.setSelectedEquipment(null);
        }
        // Otherwise, determine which object is selected by the mouse, if any
        else{
            exp.selectedEquipment = null;
            for(var i = 0; i < exp.equipment.length; i++){
            var eq = this.experiment.equipment[i];
                if(eq.inBounds([mouseX, mouseY])){
                    this.setSelectedEquipment(eq);
                    break;
                }
            }
        }
    }

    /**
    Call when the mouse is moved
    */
    mouseMove(){
        if(this.selectedEquipment !== null){
            this.selectedEquipment.equipment.setPosition([mouseX, mouseY]);
        }
    }

}