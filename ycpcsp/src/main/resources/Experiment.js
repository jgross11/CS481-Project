/**
An object used to keep track of all of the components in an experiment
*/
class Experiment{

    /**
    Create an empty experiment
    */
    constructor(){
        // The list of Equipment in this Experiment
        this.equipment = null;
        this.reset();
    }

    /**
    Bring the experiment to its default state
    */
    reset(){
        this.equipment = [];
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

}