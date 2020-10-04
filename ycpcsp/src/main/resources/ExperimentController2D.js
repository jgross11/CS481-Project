/**
A Controller used to control an Experiment in a 2D space
*/
class ExperimentController2D{

    /**
    Create an empty Controller for the given Experiment, also resets the Experiment
    experiment: The Experiment which will be controlled by this Controller
    graphics: true to set up graphics for this controller, false otherwise
    */
    constructor(experiment, graphics = false){
        this.experiment = experiment;
        this.selectedEquipment = null;
        this.placingEquipment = null;
        this.instructions = []
        this.instructionCounter = 0;

        // The list of Equipment currently placed into the lab
        this.placedEquipment = [];

        this.graphics = graphics ? createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT) : null;
        // Create a P5 graphics object to use for rendering the Experiment
        var r = EXP_BOUNDS;
        this.experimentGraphics = graphics ? createGraphics(r[2], r[3]) : null;

        /*
        TODO
            Need 2 equipment lists
                one for equipment on the lab table
                one for all equipment which exists in the lab
            Need list of all chemicals which can be used in the lab
        */
        this.reset();
    }

    /**
    Set this Controller's Experiment
    experiment: The Experiment to set for this Controller
    */
    setExperiment(experiment){
        this.experiment = experiment;
    }

    /**
    Set the Equipment which this Controller has selected
    */
    setSelectedEquipment(selected){
        this.selectedEquipment = selected;
    }

    /**
    Set the list of Instructions for use in this Controller's Experiment.
    Instructions determine the intended course of action for the Experiment.
    Each instruction should bring the Experiment from beginning to end, one step at a time.
    instructions: the list of instructions
    */
    setInstructions(instructions){
        this.instructions = instructions;
    }

    /**
    Set the current instruction index which this Controller is on
    instructions: The current instruction index, if this is an invalid index, this method does nothing
    */
    setInstructionCounter(instructionCounter){
        if(instructionCounter < 0 || instructionCounter > this.instructions.length - 1) return;
        this.instructionCounter = instructionCounter;
    }

    /**
    Perform the next Instruction to happen for this Controller
    Does nothing if the Equipment needed for the Instruction has not been placed
    */
    nextInstruction(){
        if(this.instructionCounter < this.instructions.length){
            let insC = this.instructions[this.instructionCounter];
            let ins = insC.instruction;
            let eqs = this.placedEquipment;

            // Check to ensure that the Instruction's ExperimentObject has been placed in the lab, if possible
            //  if either object can be placed and it's not placed, do nothing
            if((ins.actor.canPlace() !== eqs.includes(ins.actor)) ||
               (ins.receiver.canPlace() !== eqs.includes(ins.receiver))) return;

            insC.activate();
            this.instructionCounter++;
        }
    }

    /**
    Add a new piece of Equipment to this Controller's Experiment. If the Equipment already exists, it is not added a second time
    equipment: The EquipmentController with the Equipment to add
    place: true to also place the given Equipment into the Experiment, false to just store it, default false
    */
    addEquipment(equipment, place = false){
        let eqs = this.experiment.equipment;
        if(!eqs.includes(equipment)) eqs.push(equipment);
        if(place) this.placeEquipment(eqs.indexOf(equipment));
    }

    /**
    Place a piece of Equipment to the placed list of this Controller.
    Does nothing if the index is not in the range of the list
    index: The index of the piece of Equipment from the Experiment of this Controller to add to the placed list
    */
    placeEquipment(index){
        let eqs = this.experiment.equipment;
        let pEqs = this.placedEquipment;
        if(index < 0 || index > eqs.length - 1) return;
        let toAdd = eqs[index];
        if(!pEqs.includes(toAdd)) pEqs.push(toAdd);
    }

    /**
    Remove a piece of equipment from this Controller's Experiment.
    Does nothing if the equipment is not in the array
    equipment: The Equipment to remove
    returns: true if the Equipment was removed, false otherwise
    */
    removeEquipment(equipment){
        this.unPlaceEquipment(equipment);

        let eqs = this.experiment.equipment;
        var index = eqs.indexOf(equipment);
        if(index !== -1){
            eqs.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
    Remove a piece of Equipment from the Equipment placed in the Controller, but not this Controller's Experiment
        list of this Controller's Experiment's Equipment
    equipment: The Equipment to remove
    */
    unPlaceEquipment(equipment){
        var index = this.placedEquipment.indexOf(equipment);
        if(index !== -1){
            this.placedEquipment.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
    Bring the Experiment to its default state, bringing everything out of the Experiment, resetting the instructions, and resetting all equipment
    */
    reset(){
        this.placedEquipment = [];
        this.selectedEquipment = null;
        this.instructionCounter = 0;
        if(this.experiment === null) return;
        let eqs = this.experiment.equipment;
        for(var i = 0; i < eqs.length; i++){
            eqs[i].reset();
        }
    }

    /**
    Find a piece of Equipment in the lab which contains a point of the Equipment placed in this Controller's placed Equipment
    p: The point, a list of [x, y] coordinates
    exclude: A specific object to ignore, or a list of objects to ignore, or null to ignore none, default null
    returns: The piece of equipment, or null if none is found
    */
    findEquipmentByPosition(p, exclude = null){
        for(var i = 0; i < this.placedEquipment.length; i++){
            var eq = this.placedEquipment[i];
            if(eq.inBounds(p) && (exclude === null || exclude !== eq && (!Array.isArray(exclude) || !exclude.includes(eq)))){
                return eq;
            }
        }
        return null;
    }

    /**
    Get a piece of equipment with the matching name of the equipment placed in this Controller's placed Equipment
    instanceID: The instanceID of the object to search
    returns: The found piece of Equipment, or null if none is found
    */
    findEquipmentByInstanceID(instanceID){
        let eqs = this.placedEquipment;
        for(var i = 0; i < eqs.length; i++){
            if(eqs[i].equipment.instanceID === instanceID) return eqs[i];
        }
        return null;
    }

    /**
    Get the x position of the mouse based on the position of the rendered Experiment
    */
    experimentMouseX(){
        return mouseX - EXP_BOUNDS[0];
    }

    /**
    Get the y position of the mouse based on the position of the rendered Experiment
    */
    experimentMouseY(){
        return mouseY - EXP_BOUNDS[1];
    }

    /**
    Get the y position of the mouse based on the position of the rendered Experiment
    */
    experimentMousePos(){
        return [this.experimentMouseX(), this.experimentMouseY()];
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        // If there is a selected object, check for another piece of Equipment, combine the chemicals if one is found,
        //  and unselect the original
        let select = this.selectedEquipment;
        let expMouse = this.experimentMousePos();
        let mouse = [mouseX, mouseY];

        // If the mouse is inside the rendered Experiment, check for mouse behavior inside the rendered Experiment
        if(pointInRect2D(EXP_BOUNDS, mouse)){
            if(select !== null){
                // TODO modify this so that this particular set of calls is only made for beakers
                select.pourInto(this.findEquipmentByPosition(expMouse, select));
                this.setSelectedEquipment(null);
            }
            // Otherwise, determine which object is selected by the mouse, if any
            else{
                this.setSelectedEquipment(this.findEquipmentByPosition(expMouse));
            }
        }
        // Otherwise, handle clicking outside the rendered Experiment
        else{
            let eqs = this.experiment.equipment;
            let place = this.placingEquipment;
            // If the Equipment to be inserted to the Experiment is not selected, attempt to select a piece of
            //  Equipment from the equipment squares
            if(place === null){
                // Check for if the mouse clicked on an Equipment square
                for(var i = 0; i < eqs.length; i++){
                    let r = this.equipSquareBounds(i);
                    if(pointInRect2D(r, mouse)){
                        this.placingEquipment = eqs[i];
                        this.placingEquipment.setCenter(mouseX, mouseY);
                        break;
                    }
                }
            }
        }
    }

    /**
    Call when the mouse is released
    */
    mouseRelease(){
        let place = this.placingEquipment;
        // If the Equipment to be inserted has been selected, attempt to insert it
        if(place !== null){
            let expMouse = this.experimentMousePos();
            let eqs = this.experiment.equipment;
            // If the mouse is inside the experiment, add the equipment
            if(pointInRect2D(EXP_BOUNDS, expMouse)){
                place.setCenter(expMouse[0], expMouse[1]);
                this.placeEquipment(eqs.indexOf(place)); // TODO handle indexOf = -1 case
            }
            // Otherwise, let go of the inserting equipment
            this.placingEquipment = null;
        }
    }

    /**
    Call when the mouse is moved
    */
    mouseMove(){
        // TODO add this back in to allow mouse movement
        //if(this.selectedEquipment !== null){
        //    this.selectedEquipment.equipment.setPosition(this.experimentMousePos());
        //}
    }

    /**
    Call when the mouse is dragged
    */
    mouseDrag(){
        // If the equipment to be placed is selected, update it's position
        let place = this.placingEquipment;
        if(place !== null){
            place.setCenter(mouseX, mouseY);
        }
    }

    /**
    Call when a key on the keyboard is pressed
    */
    keyPress(){
        // Option should only work for Container objects
        let eq = this.selectedEquipment;
        let eqs = this.experiment.equipment;
        // Empty the beaker
        // TODO modify this so that the calls under ESCAPE and key default are only made for beakers
        switch(keyCode){
            case ESCAPE:
                if(eq === null) break;
                eq.emptyOut();
                this.setSelectedEquipment(null);
                break;
        }
        switch(key){
            case 'i':
                this.nextInstruction();
                break;
            case 'r':
                this.reset();
                break;

            // TODO this is a temporary control until beakers can be clicked and dragged in
            case 'z': this.placeEquipment(0); break;
            case 'x': this.placeEquipment(1); break;
            case 'c': this.placeEquipment(2); break;

            default:
                if(eq === null) break;
                var color;
                switch(key){
                    case '1': color = [255, 0, 0]; break;
                    case '2': color = [0, 255, 0]; break;
                    case '3': color = [0, 0, 255]; break;
                    default: color = null;
                }
                if(color !== null) eq.addTo(new ChemicalController2D(new Chemical(10, "", 20, color)));
                break;
        }
    }


    /**
    Draw the full Experiment to the P5 graphics
    */
    render(){
        if(this.graphics === null) return;

        // Convenience variables for rendering
        let exp = this.experiment;
        let placed = this.placedEquipment;
        let eqs = exp.equipment;
        let r = EXP_BOUNDS;
        let expG = this.experimentGraphics;
        let g = this.graphics;

        // Fill in a background
        g.background(120);

        // Draw the area containing the interactable portion of the Experiment
        expG.background(230);

        // Draw the lab table
        // TODO

        // Draw the disposal area
        // TODO

        // Draw objects on the lab table
        // Draw all not selected equipment
        for(var i = 0; i < placed.length; i++){
            if(placed[i] !== this.selectedEquipment){
                placed[i].draw(expG);
            }
        }
        // Draw the selected equipment if it exists
        let eq = this.selectedEquipment;
        if(eq !== null){
            eq.draw(expG);
            // Draw a box around the selected equipment and draw it on top of all other equipment
            expG.noFill();
            expG.stroke(150, 150, 255, 160);
            expG.strokeWeight(8);
            expG.rect(eq.x(), eq.y(), eq.width(), eq.height());
        }


        // Draw options button
        // TODO


        // Draw steps button
        // TODO

        // Draw the final image of the lab to the main canvas
        g.stroke(0);
        g.strokeWeight(4);
        g.noFill();
        g.rect(r[0], r[1], r[2], r[3]);
        g.image(expG, r[0], r[1]);

        // Draw the title and creator
        g.fill(color(0, 0, 0));
        g.noStroke();
        g.textSize(24);
        g.text(exp.title + " created by " + exp.creator, 10, 24);

        // Draw the equipment list at the bottom
        // TODO
        g.stroke(0);
        g.strokeWeight(3);
        g.fill(200);
        for(var i = 0; i < eqs.length; i++){
            this.drawEquipSquare(eqs[i], i);
        }

        // Draw the equipment to be placed in the Experiment

        let place = this.placingEquipment;
        if(place !== null){
            place.drawSprite(this.graphics);
        }


        // Draw instructions
        g.fill(color(0, 0, 0));
        g.noStroke();
        g.textSize(18);
        var y = 500;
        let x = 400;
        // TODO remove text, only here for testing purposes
        g.text("Press z, x, c to add beaker 1, 2, 3 respectively", x, y += 20);
        g.text("Click a beaker to select it", x, y += 20);
        g.text("Press 1 to put red chemical to selected beaker", x, y += 20);
        g.text("Press 2 to put green chemical to selected beaker", x, y += 20);
        g.text("Press 3 to put blue chemical to selected beaker", x, y += 20);
        g.text("Press ESC to empty the selected beaker", x, y += 20);
        g.text("Click an unselected beaker to combine the chemical in the selected beaker", x, y += 20);
        g.text("Press I to run the next instruction", x, y += 20);
        g.text("Press R to reset the simulation", x, y += 20);

        // Draw the final graphics image to the canvas
        image(g, 0, 0);
    }

    /**
    Draw a single piece of Equipment for displaying at the bottom of the screen.
    Draws a rectangle along with the equipment picture.
    Set stroke and fill before calling this method
    equip: The EquipmentController containing the equipment to be drawn
    i: The index of the EquipmentController
    */
    drawEquipSquare(equip, i){
        let SIZE = EXP_EQUIP_BOX_SIZE;

        let r = this.equipSquareBounds(i);
        let IMG_SIZE = 0.8 * SIZE;
        let IMG_OFF = (SIZE - IMG_SIZE) * 0.5;

        let g = this.graphics;
        g.rect(r[0], r[1], r[2], r[3]);
        g.image(equip.equipment.sprite, r[0] + IMG_OFF, r[1] + IMG_OFF, IMG_SIZE, IMG_SIZE);
    }

    /**
    Get the rectangular bounds of a square representing a piece of available Equipment
    i: The index of the square
    */
    equipSquareBounds(i){
        let SIZE = EXP_EQUIP_BOX_SIZE;
        let x = EXP_EQUIP_BOX_OFF_X + i * SIZE;
        let y = EXP_EQUIP_BOX_OFF_Y + CANVAS_HEIGHT - SIZE;
        return [x, y, SIZE, SIZE];
    }

}