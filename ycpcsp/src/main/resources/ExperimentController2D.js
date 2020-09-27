/**
A Controller used to control an experiment in a 2D space
*/
class ExperimentController2D{

    /**
    Create an empty Controller.
    experiment: The experiment which will be controlled by this Controller
    */
    constructor(experiment){
        this.experiment = experiment;
        this.selectedEquipment = null;
        this.instructions = []
        this.instructionCounter = 0;
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
    Set the list of instructions for use in this Experiment.
    Instructions determine the intended course of action for the Experiment.
    Each instruction should bring the Experiment from beginning to end, one step at a time.
    instructions: the list of instructions
    */
    setInstructions(instructions){
        this.instructions = instructions;
    }

    /**
    Set the current instruction index which this Experiment is on
    instructions: The current instruction index, if this is an invalid index, this method does nothing
    */
    setInstructionCounter(instructionCounter){
        if(instructionCounter < 0 || instructionCounter > this.instructions.length - 1) return;
        this.instructionCounter = instructionCounter;
    }

    /**
    Perform the next Instruction to happen for this Experiment
    */
    nextInstruction(){
        if(this.instructionCounter < this.instructions.length){
            this.instructions[this.instructionCounter].activate();
            this.instructionCounter++;
        }
    }

    /**
    Bring the Experiment to its default state
    */
    reset(){
        this.experiment.equipment = [];
        this.selectedEquipment = null;
        this.instructions = []
        this.instructionCounter = 0;
    }

    /**
    Bring the Experiment to the next step
    */
    runStep(){
        // TODO implement
    }

    /**
    Find a piece of equipment which contains a point
    p: The point, a list of [x, y] coordinates
    exclude: A specific object to ignore, or a list of objects to ignore, or null to ignore none, default null
    returns: The piece of equipment, or null if none is found
    */
    findEquipment(p, exclude = null){
        for(var i = 0; i < this.experiment.equipment.length; i++){
            var eq = this.experiment.equipment[i];
            if(eq.inBounds(p) && (exclude === null || exclude !== eq && (!Array.isArray(exclude) || !exclude.includes(eq)))){
                return eq;
            }
        }
        return null;
    }

    /**
    Draw the full Experiment to the P5 graphics
    */
    render(){
        let exp = this.experiment;
        // Draw all not selected equipment
        for(var i = 0; i < exp.equipment.length; i++){
            if(exp.equipment[i] !== this.selectedEquipment){
                exp.equipment[i].draw();
            }

        }
        // Draw the selected equipment if it exists
        let eq = this.selectedEquipment;
        if(eq !== null){
            eq.draw();
            // Draw a box around the selected equipment and draw it on top of all other equipment
            noFill();
            stroke(150, 150, 255, 160);
            strokeWeight(8);
            rect(eq.x(), eq.y(), eq.width(), eq.height());
        }

        // Draw instructions
        fill(color(0, 0, 0));
        noStroke();
        textSize(18);
        var y = 600;
        text("Click a beaker to select it", 20, y += 20);
        text("Press 1 to put red chemical to selected beaker", 20, y += 20);
        text("Press 2 to put green chemical to selected beaker", 20, y += 20);
        text("Press 3 to put blue chemical to selected beaker", 20, y += 20);
        text("Press ESC to empty the selected beaker", 20, y += 20);
        text("Click an unselected beaker to combine the chemical in the selected beaker", 20, y += 20);
        text("Press I to run the next instruction", 20, y += 20);
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        // If there is a selected object, check for another piece of Equipment, combine the chemicals if one is found,
        //  and unselect the original
        let select = this.selectedEquipment;
        if(select !== null){
            // TODO modify this so that this particular set of calls is only made for beakers
            select.pourInto(this.findEquipment([mouseX, mouseY], select));
            this.setSelectedEquipment(null);
        }
        // Otherwise, determine which object is selected by the mouse, if any
        else{
            this.setSelectedEquipment(this.findEquipment([mouseX, mouseY]));
        }
    }

    /**
    Call when the mouse is moved
    */
    mouseMove(){
        // TODO add this back in to allow mouse movement
        // if(this.selectedEquipment !== null){
        //     this.selectedEquipment.equipment.setPosition([mouseX, mouseY]);
        // }
    }

    /**
    Call when a key on the keyboard is pressed
    */
    keyPress(){
        // Option should only work for Container objects
        let eq = this.selectedEquipment;
        // Empty the beaker
        // TODO modify this so that the calls under ESCAPE and key default are only made for beakers
        switch(keyCode){
            case ESCAPE:
                if(eq === null) break;
                eq.pourOut();
                this.setSelectedEquipment(null);
                break;
        }
        switch(key){
            case 'i':
                this.nextInstruction();
                break;

            default:
                if(eq === null) break;
                var color;
                switch(key){
                    case '1': color = [255, 0, 0]; break;
                    case '2': color = [0, 255, 0]; break;
                    case '3': color = [0, 0, 255]; break;
                    default: color = null;
                }
                if(color !== null) eq.equipment.setContents(new Chemical(10, "" + color, "", 20, color));
                break;
        }
    }

}