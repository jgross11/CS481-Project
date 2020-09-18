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
        var equipController = new EquipmentController2D(null);
        for(var i = 0; i < this.equipment.length; i++){
            equipController.setEquipment(this.equipment[i]);
            equipController.draw();
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
            var equipController = new EquipmentController2D(null);
            for(var i = 0; i < this.equipment.length; i++){
                var eq = this.equipment[i];
                equipController.setEquipment(eq);
                if(equipController.inBounds([mouseX, mouseY])){
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