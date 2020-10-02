/**
An object used to keep track of all of the components in an experiment
*/
class Experiment{

    /**
    Create an empty experiment.
    */
    constructor(){
        this.reset();
    }

    /**
    Bring the experiment to its default state
    */
    reset(){
        // The list of Equipment in this Experiment
        this.equipment = [];
        this.selectedEquipment = null;
    }

    /**
    Bring the experiment to the next step
    */
    runStep(){
        // TODO implement
    }

    /**
    Draw the full Experiment to the P5 graphics
    */
    render(){
        for(var i = 0; i < this.equipment.length; i++){
            this.equipment[i].draw();
        }
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        // If there is a selected object, unselect it
        if(this.selectedEquipment !== null){
            this.selectedEquipment = null;
        }
        // Otherwise, determine which object is selected by the mouse, if any
        else{
            this.selectedEquipment = null;
            for(var i = 0; i < this.equipment.length; i++){
                var eq = this.equipment[i];
                if(eq.inBounds([mouseX, mouseY])){
                    this.selectedEquipment = eq;
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
            this.selectedEquipment.setPosition([mouseX, mouseY]);
        }
    }

}