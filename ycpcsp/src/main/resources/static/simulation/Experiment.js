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
        this.chemicalBoxes = new ChemicalBoxList();
        this.displayedBoxList = null;

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
    Determine if the EquipmentBoxList is being displayed
    returns: true if the list is displayed, false otherwise
    */
    isDisplayEquipment(){
        return this.equipmentBoxes === this.displayedBoxList;
    }

    /**
    Determine if the ChemicalBoxList is being displayed
    returns: true if the list is displayed, false otherwise
    */
    isDisplayChemicals(){
        return this.chemicalBoxes === this.displayedBoxList;
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
        this.chemicalBoxes = new ChemicalBoxList();
        this.selectedEquipment = null;
        this.instructionCounter = 0;

        if(this.experiment === null) return;
        let eqs = this.experiment.equipment;
        for(var i = 0; i < eqs.length; i++){
            eqs[i].reset();
            this.equipmentBoxes.add(eqs[i]);
        }

        // Place all Chemicals in the Chemical list
        let chems = this.experiment.chemicals;
        for(var i = 0; i < chems.length; i++){
            this.chemicalBoxes.add(new ChemicalController2D(chems[i].copyChem()));
        }
        this.displayedBoxList = this.equipmentBoxes;
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
    id: The function ID to use for the selected EquipmentController
    returns: true if the function is activated, false otherwise
    */
    selectedEquipFunction(id){
        let select = this.selectedEquipment;
        if(select === null || select === undefined) return false;
        let func = select.idToFunc(id);
        if(func === null || func === undefined) return false;
        let param = this.findEquipmentByPosition(this.experimentMousePos(), select);
        if(param === null || param === undefined) return false;
        func.bind(select, param)();
        return true;
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
            // If the mouse is inside the Experiment, attempt to make a selection for moving an Equipment
            if(inExpBounds){
                // If there is no selection made for movement, make a selection
                if(this.movingEquipment === null) this.setMovingEquipment(this.findEquipmentByPosition(expMouse));
            }
            // If the mouse is outside the bounds, attempt to select an EquipmentBox
            else{
                let boxes = this.equipmentBoxes;
                if(boxes !== null) boxes.selectBox();

                // Select a chemical
                if(this.isDisplayChemicals()){
                    this.chemicalBoxes.selectBox();
                }
            }
        }

        // Handle right click, for selecting objects
        else if(mouseButton === RIGHT){
            // If in the Experiment bounds, check for object interaction
            if(inExpBounds){
                // If an object is selected, run a function on it
                if(isSelect){
                    // TODO allow multiple constants to exist here. The user selects an action when the initially right click
                    this.selectedEquipFunction(ID_FUNC_CONTAINER_POUR_INTO);
                    this.setSelectedEquipment(null);
                }
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
            if(this.isDisplayEquipment()){
                if(pointInRect2D(EXP_BOUNDS, [mouseX, mouseY])){
                    this.equipmentBoxes.place(this);
                }
                else{
                    this.equipmentBoxes.unselect();
                }
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
        let boxes = this.equipmentBoxes;
        if(boxes !== null && this.isDisplayEquipment()) boxes.updateSelectPos();

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
            case 'c':
                this.displayedBoxList = this.chemicalBoxes;
                break;
            case 'v':
                this.displayedBoxList = this.equipmentBoxes;
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
            expG.stroke(EXP_EQUIP_SELECT_STROKE_COLOR);
            expG.strokeWeight(EXP_EQUIP_SELECT_STROKE_WEIGHT);
            expG.rect(sel.x(), sel.y(), sel.width(), sel.height());
        }

        // TODO remove, only here for testing purposes
        // Draw instructions
        expG.fill(color(0, 0, 0));
        expG.noStroke();
        expG.textSize(18);
        var y = 370;
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
        expG.text("Press C to view Chemical tab", x, y += 20);
        expG.text("Press V to view Equipment tab", x, y += 20);

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
        let boxes = this.displayedBoxList;
        if(boxes !== null) boxes.draw(g);

        // Draw the equipment to be placed in the Experiment
        if(this.isDisplayEquipment()) this.equipmentBoxes.drawSelected(g);

        // Draw the final graphics image to the canvas
        image(g, 0, 0);
    }

}

/**
A helper object used by ExperimentController2D to handle a list of DisplayBox objects
*/
class DisplayBoxList{

    /**
    Create an empty DisplayBoxList
    */
    constructor(){
        // The List of DisplayBoxes
        this.boxes = []
        // The currently selected box of this list
        this.selected = null;
    }

    /**
    Select a box based on the mouse position, only if an EquipmentBox is not already selected
    returns: true if a box was selected, false otherwise
    */
    selectBox(){
        let mouse = [mouseX, mouseY];
        for(var i = 0; i < this.boxes.length; i++){
            let b = this.boxes[i];
            let r = b.bounds();
            if(pointInRect2D(r, mouse)){
                this.selected = b;
                return true;
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
    Get the Object of the DisplayBox with the given index
    i: The index
    returns: The DisplayBox
    */
    get(i){
        let b = this.boxes[i];
        if(b === undefined) return b;
        return this.boxes[i].obj;
    }

    /**
    Create an appropriate box for this DisplayBoxList
    obj: The object for the box
    index: The index for the box
    returns: The box
    */
    createBox(obj, index){
        throw new Error("DisplayBoxLists objects must implement createBox");
    }

    /**
    Add a new DisplayBox to this List with the given Object
    obj: The Object which will be added in this List
    */
    add(obj){
        this.boxes.push(this.createBox(obj, this.boxes.length));
    }

    /**
    Remove an DisplayBox from the list
    obj: The Object contained in an DisplayBox to remove
    returns: true if the DisplayBox was removed, false otherwise
    */
    remove(obj){
        for(var i = 0; i < this.boxes.length; i++){
            if(this.boxes[i].obj === obj){
                this.boxes.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    /**
    Draw all of the DisplayBoxes in this List, set the P5 rendering parameters before it this method is called.
    Also draws a light blue box on top of the selected box
    g: The P5 graphics object to use
    */
    draw(g){
        for(var i = 0; i < this.boxes.length; i++){
            var b = this.boxes[i];
            let sel = this.selected;
            let index = (sel === null) ? null : sel.index;
            b.draw(g, index === b.index);
        }
    }
}

/**
A helper object used by ExperimentController2D to handle a list of EquipmentBox objects
*/
class EquipmentBoxList extends DisplayBoxList{

    /**
    Create an empty EquipmentBoxList
    */
    constructor(){
        super();
    }

    selectBox(){
        let success = super.selectBox();
        if(success) this.selected.obj.setCenter(mouseX, mouseY);
    }

    /**
    Create an appropriate box for this EquipmentBoxList
    obj: The object for the box
    index: The index for the box
    returns: The box
    */
    createBox(obj, index){
        return new EquipmentBox(obj, index);
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
            sel.obj.setCenter(expMouse[0], expMouse[1]);
            let eqs = expControl.experiment.equipment;

            let index = eqs.indexOf(sel.obj);
            if(index < 0) success = false;
            else{
                expControl.placeEquipment(index);
                this.remove(sel.obj);
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
            this.selected.obj.setCenter(mouseX, mouseY);
            return true;
        }
        return false;
    }

    /**
    Draw the selected EquipmentBox sprite
    g: The P5 graphics object to use
    */
    drawSelected(g){
        let sel = this.selected;
        if(sel !== null){
            sel.obj.drawSprite(g);
        }
    }

}

/**
A helper object used by ExperimentController2D to handle a list of ChemicalBox objects
*/
class ChemicalBoxList extends DisplayBoxList{

    /**
    Create an empty ChemicalBoxList
    */
    constructor(){
        super();
    }

    /**
    Create an appropriate box for this EquipmentBoxList
    obj: The object for the box
    index: The index for the box
    returns: The box
    */
    createBox(obj, index){
        return new ChemicalBox(obj, index);
    }
}


/**
A helper object used by BoxLists for displaying and interacting with Experiment elements
*/
class DisplayBox{
    /**
    Create a new EquipmentBox to handle drawing and mouse input for an Equipment box
    obj: The Object holding to be stored in this DisplayBox
    index: The index position where this Box should be rendered
    */
    constructor(obj, index){
        this.obj = obj;
        this.index = index;
    }

    /**
    Set the Object used by this EquipmentBox
    obj: The EquipmentController2D to set
    */
    setObj(obj){
        this.obj = obj;
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
    g: The P5 graphics object to use for rendering
    selected: true if this box should be drawn as selected, false otherwise
    */
    draw(g, selected){
        let SIZE = EXP_BOX_SIZE;

        let r = this.bounds();
        let IMG_SIZE = EXP_BOX_SPRITE_SIZE * SIZE;
        // 0.5 constant for centering, not adjustable
        let IMG_OFF = (SIZE - IMG_SIZE) * 0.5;

        g.stroke(EXP_BOX_STROKE_COLOR);
        g.strokeWeight(EXP_BOX_STROKE_WEIGHT);
        g.fill(EXP_BOX_FILL_COLOR);

        g.rect(r[0], r[1], r[2], r[3]);

        if(selected){
            g.noStroke();
            g.fill(EXP_BOX_SELECT_COLOR);
            g.rect(r[0], r[1], r[2], r[3]);
        }

        g.image(this.getImage(), r[0] + IMG_OFF, r[1] + IMG_OFF, IMG_SIZE, IMG_SIZE);
    }

    /**
    Get the Square image which will be used to display this Box
    */
    getImage(){
        throw new Error("DisplayBox objects must implement getImage");
    }

    /**
    Get the rectangular bounds of a square representing a piece of available Equipment
    i: The index of the square
    */
    bounds(){
        let SIZE = EXP_BOX_SIZE;
        let x = EXP_BOX_OFF_X + this.index * SIZE;
        let y = EXP_BOX_OFF_Y + CANVAS_HEIGHT - SIZE;
        return [x, y, SIZE, SIZE];
    }

}


/**
A helper object used by EquipmentBoxList for allowing the user to click and drag Equipment into the Experiment
*/
class EquipmentBox extends DisplayBox{
    constructor(obj, index){
        super(obj, index);
    }

    getImage(){
        return this.obj.equipment.sprite;
    }
}


/**
A helper object used by ChemicalBoxList for allowing the user to select Chemicals from a tab
*/
class ChemicalBox extends DisplayBox{
    constructor(chemControl, index){
        super(chemControl, index);
        this.graphics = createGraphics(EXP_BOX_SIZE, EXP_BOX_SIZE);
    }

    getImage(){
        this.graphics.fill(255);
        this.obj.drawRect(0, 0, 1, EXP_BOX_SIZE, EXP_BOX_SIZE, 0, this.graphics)
        return this.graphics;
    }
}
