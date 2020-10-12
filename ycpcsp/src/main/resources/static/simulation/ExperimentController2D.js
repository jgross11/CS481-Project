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

        // The EquipmentController2D object which is being selected for interactions
        this.selectedEquipment = null;

        // The EquipmentController2D object which is being selected and moved by the mouse
        this.movingEquipment = null;
        // The position of the mouse when the EquipmentController2D was when selecting it for movement
        this.movingEquipAnchor = [0, 0];

        this.instructionCounter = 0;

        this.equipmentBoxes = new EquipmentBoxList();

        // The list of Equipment currently placed into the lab
        this.placedEquipment = [];

        this.graphics = graphics ? createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT) : null;
        // Create a P5 graphics object to use for rendering the Experiment
        var r = EXP_BOUNDS;
        this.experimentGraphics = graphics ? createGraphics(r[2], r[3]) : null;

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
    Set the EquipmentController which this ExperimentController has selected
    selectControl: The EquipmentController to set
    */
    setSelectedEquipment(selectControl){
        this.selectedEquipment = selectControl;
    }

    /**
    Set the EquipmentController which this ExperimentController has chosen for movement with the mouse
    moveControl: The EquipmentController to set
    */
    setMovingEquipment(moveControl){
        this.movingEquipment = moveControl;
        if(this.movingEquipment !== null){
            let p = this.movingEquipment.equipment.position;
            let m = this.experimentMousePos();
            this.movingEquipAnchor = [p[0] - m[0], p[1] - m[1]];
        }
    }

    /**
    Set the current instruction index which this Controller is on
    instructions: The current instruction index, if this is an invalid index, this method does nothing
    */
    setInstructionCounter(instructionCounter){
        let instructions = this.experiment.instructions;
        if(instructionCounter < 0 || instructionCounter > instructions.length - 1) return;
        this.instructionCounter = instructionCounter;
    }

    /**
    Perform the next Instruction to happen for this Controller
    Does nothing if the Equipment needed for the Instruction has not been placed
    */
    nextInstruction(){
        let instructions = this.experiment.instructions;
        if(this.instructionCounter < instructions.length){
            let insC = instructions[this.instructionCounter];
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
    equipControl: The EquipmentController with the Equipment to add
    place: true to also place the given Equipment into the Experiment, false to just store it, default false
    */
    addEquipment(equipControl, place = false){
        let eqs = this.experiment.equipment;
        if(!eqs.includes(equipControl)){
            eqs.push(equipControl);
            if(!place) this.equipmentBoxes.add(equipControl);
        }
        if(place) this.placeEquipment(eqs.indexOf(equipControl));
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
    equipControl: The EquipmentController to remove
    returns: true if the Equipment was removed, false otherwise
    */
    removeEquipment(equipControl){
        this.unPlaceEquipment(equipControl);

        let eqs = this.experiment.equipment;
        var index = eqs.indexOf(equipControl);
        if(index !== -1){
            eqs.splice(index, 1);
            this.equipmentBoxes.remove(equipControl)
            return true;
        }
        return false;
    }

    /**
    Remove an EquipmentController from the EquipmentControllers placed in this ExperimentController,
        but not this ExperimentController's Experiment.
    equipControl: The EquipmentController to remove
    */
    unPlaceEquipment(equipControl){
        var index = this.placedEquipment.indexOf(equipControl);
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
        this.equipmentBoxes = new EquipmentBoxList();
        this.selectedEquipment = null;
        this.instructionCounter = 0;
        // TODO after calling reset, instructions don't work, fix this
        if(this.experiment === null) return;
        let eqs = this.experiment.equipment;
        for(var i = 0; i < eqs.length; i++){
            eqs[i].reset();
            this.equipmentBoxes.add(eqs[i]);
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
    Call to activate a specific function on the selected EquipmentController
    func: The function to use TODO define how this variable will be used
    */
    selectedEquipFunction(func){
        // TODO modify this so that this particular set of calls is only made for beakers
        this.selectedEquipment.pourInto(this.findEquipmentByPosition(this.experimentMousePos(), select));
        this.setSelectedEquipment(null);
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        // Convenience variables
        let mouse = [mouseX, mouseY];
        let expMouse = this.experimentMousePos();
        let inExpBounds = pointInRect2D(EXP_BOUNDS, mouse);
        let isSelect = this.selectedEquipment !== null;

        // Handle left click, for moving objects
        if(mouseButton === LEFT){
            // If the mouse is outside the bounds, attempt to select an EquipmentBox
            if(!inExpBounds){
                this.equipmentBoxes.selectBox();
            }
            // If there is no selection made for movement, make a selection
            if(this.movingEquipment === null) this.setMovingEquipment(this.findEquipmentByPosition(expMouse));
        }

        // Handle right click, for selecting objects
        else if(mouseButton === RIGHT){
            // If in the Experiment bounds, check for object interaction
            if(inExpBounds){
                // If an object is selected, run a function on it
                if(isSelect) this.selectedEquipFunction(null);
                // Otherwise, attempt to select a piece of Equipment
                else this.setSelectedEquipment(this.findEquipmentByPosition(expMouse));
            }
        }
    }

    /**
    Call when the mouse is released
    */
    mouseRelease(){
        // Handle left click, for moving objects
        if(mouseButton === LEFT){
            // If the mouse is inside the experiment, attempt to add the Equipment from the Equipment boxes
            if(pointInRect2D(EXP_BOUNDS, [mouseX, mouseY])){
                this.equipmentBoxes.place(this);
            }
            else{
                this.equipmentBoxes.unselect();
            }
            this.setMovingEquipment(null);
        }
    }

    /**
    Call when the mouse is moved
    */
    mouseMove(){
    }

    /**
    Call when the mouse is dragged
    */
    mouseDrag(){
        // If the equipment to be placed is selected, update it's position
        this.equipmentBoxes.updateSelectPos();

        // Update the position of the object being moved by the mouse
        if(this.movingEquipment !== null){
            var pos = this.experimentMousePos();
            pos[0] += this.movingEquipAnchor[0];
            pos[1] += this.movingEquipAnchor[1];
            this.movingEquipment.equipment.setPosition(pos);
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
        let sel = this.selectedEquipment;

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
            if(placed[i] !== sel){
                placed[i].draw(expG);
            }
        }
        // Draw the selected equipment if it exists
        if(sel !== null){
            sel.draw(expG);
            // Draw a box around the selected equipment and draw it on top of all other equipment
            expG.noFill();
            expG.stroke(150, 150, 255, 160);
            expG.strokeWeight(8);
            expG.rect(sel.x(), sel.y(), sel.width(), sel.height());
        }

        // TODO remove, only here for testing purposes
        // Draw instructions
        expG.fill(color(0, 0, 0));
        expG.noStroke();
        expG.textSize(18);
        var y = 410;
        let x = 650;
        expG.text("Left click a beaker to move it", x, y += 20);
        expG.text("Right click a beaker to select it", x, y += 20);
        expG.text("Press 1 to put red chemical to selected beaker", x, y += 20);
        expG.text("Press 2 to put green chemical to selected beaker", x, y += 20);
        expG.text("Press 3 to put blue chemical to selected beaker", x, y += 20);
        expG.text("Press ESC to empty the selected beaker", x, y += 20);
        expG.text("Click an unselected beaker to combine the chemical in the selected beaker", x, y += 20);
        expG.text("Press I to run the next instruction", x, y += 20);
        expG.text("Press R to reset the simulation", x, y += 20);

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
        g.stroke(0);
        g.strokeWeight(3);
        g.fill(200);
        this.equipmentBoxes.draw(g);

        // Draw the equipment to be placed in the Experiment
        this.equipmentBoxes.drawSelected(g);

        // Draw the final graphics image to the canvas
        image(g, 0, 0);
    }

}

/**
A helper object used by ExperimentController2D to handle a list of EquipmentBox objects
*/
class EquipmentBoxList{

    /**
    Create an empty EquipmentBoxList
    */
    constructor(){
        // The List of EquipmentBoxes
        this.boxes = []
        // The currently selected box for moving
        this.selected = null;
    }

    /**
    Get the EquipmentController2D of the EquipmentBox with the given index
    i: The index
    returns: The EquipmentBox
    */
    get(i){
        let b = this.boxes[i];
        if(b === undefined) return b;
        return this.boxes[i].equipControl;
    }

    /**
    Select a box based on the mouse position, only if an EquipmentBox is not already selected
    returns: true if a box was selected, false otherwise
    */
    selectBox(){
        if(this.selected === null){
            let mouse = [mouseX, mouseY];
            for(var i = 0; i < this.boxes.length; i++){
                let b = this.boxes[i];
                let r = b.bounds();
                if(pointInRect2D(r, mouse)){
                    this.selected = b;
                    this.selected.equipControl.setCenter(mouse[0], mouse[1]);
                    return true;
                }
            }
        }
        return false;
    }

    /**
    Deselect the currently selected box
    */
    unselect(){
        this.selected = null;
    }

    /**
    Add a new EquipmentBox to this List with the given EquipmentController2D
    equip: The EquipmentController2D which will be added in this List
    */
    add(equip){
        this.boxes.push(new EquipmentBox(equip, this.boxes.length));
    }

    /**
    Remove an EquipmentBox from the list
    equip: The EquipmentController2D contained in an EquipmentBox to remove
    returns: true if the EquipmentBox was removed, false otherwise
    */
    remove(equip){
        for(var i = 0; i < this.boxes.length; i++){
            if(this.boxes[i].equipControl === equip){
                this.boxes.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
    Place the EquipmentController2D to the selected EquipmentBox into the given ExperimentController2D
    Also deselect the selected box.
    expControl: The ExperimentController2D to add the Controller to
    returns: true if the Controller was added, false otherwise
    */
    place(expControl){
        let sel = this.selected;
        var success = false;
        if(sel !== null){
            let expMouse = expControl.experimentMousePos();
            sel.equipControl.setCenter(expMouse[0], expMouse[1]);
            let eqs = expControl.experiment.equipment;

            let index = eqs.indexOf(sel.equipControl);
            if(index < 0) success = false;
            else{
                expControl.placeEquipment(index);
                this.remove(sel.equipControl);
                success = true;
            }
        }
        // Let go of the inserting equipment
        this.unselect();
        return success;
    }

    /**
    Set the center of the selected EquipmentBox to the mouse position
    returns: true if the position was updated, false otherwise
    */
    updateSelectPos(){
        if(this.selected !== null){
            this.selected.equipControl.setCenter(mouseX, mouseY);
            return true;
        }
        return false;
    }

    /**
    Draw all of the EquipmentBoxes in this List
    g: The P5 graphics object to use
    */
    draw(g){
        for(var i = 0; i < this.boxes.length; i++){
            this.boxes[i].draw(g);
        }
    }

    /**
    Draw the selected EquipmentBox sprite
    g: The P5 graphics object to use
    */
    drawSelected(g){
        let sel = this.selected;
        if(sel !== null){
            sel.equipControl.drawSprite(g);
        }
    }

}

/**
A helper object used by ExperimentController2D for allowing the user to click and drag Equipment into the Experiment
*/
class EquipmentBox{

    /**
    Create a new EquipmentBox to handle drawing and mouse input for an Equipment box
    equipControl: The EquipmentController2D holding the Equipment to be rendered
    index: The index position where this Box should be rendered
    */
    constructor(equipControl, index){
        this.equipControl = equipControl;
        this.index = index;
    }

    /**
    Set the EquipmentController2D used by this EquipmentBox
    equipControl: The EquipmentController2D to set
    */
    setEquipment(equipControl){
        this.equipControl = equipControl;
    }

    /**
    Set the index for the position of this Box's rendering
    index: The index to set
    */
    setIndex(index){
        this.index = index;
    }

    /**
    Draw a single piece of Equipment for displaying at the bottom of the screen.
    Draws a rectangle along with the equipment picture.
    Set stroke and fill before calling this method
    g: The P5 graphics object to use for rendering
    */
    draw(g){
        let SIZE = EXP_EQUIP_BOX_SIZE;

        let r = this.bounds();
        let IMG_SIZE = EXP_EQUIP_BOX_SPRITE_SIZE * SIZE;
        // 0.5 constant for centering, not adjustable
        let IMG_OFF = (SIZE - IMG_SIZE) * 0.5;

        g.rect(r[0], r[1], r[2], r[3]);
        g.image(this.equipControl.equipment.sprite, r[0] + IMG_OFF, r[1] + IMG_OFF, IMG_SIZE, IMG_SIZE);
    }

    /**
    Get the rectangular bounds of a square representing a piece of available Equipment
    i: The index of the square
    */
    bounds(){
        let SIZE = EXP_EQUIP_BOX_SIZE;
        let x = EXP_EQUIP_BOX_OFF_X + this.index * SIZE;
        let y = EXP_EQUIP_BOX_OFF_Y + CANVAS_HEIGHT - SIZE;
        return [x, y, SIZE, SIZE];
    }

}