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

        // The disposers used by this Experiment
        this.disposers = [];

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

        // The EquipmentController2D object which is being selected as the actor for interactions
        this.selectedActor = null;
        // The EquipmentController2D object which is being selected as the receiver for interactions
        this.selectedReceiver = null;

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

        this.camera = new ExperimentCamera(null, EXP_CAMERA_BOUNDS);

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
    Set the EquipmentController which this ExperimentController has selected as its actor
    selectControl: The EquipmentController to set
    */
    setSelectedActor(selectControl){
        this.selectedActor = selectControl;
    }

    /**
    Set the EquipmentController which this ExperimentController has selected as its actor
    selectControl: The EquipmentController to set
    */
    setSelectedReceiver(selectControl){
        this.selectedReceiver = selectControl;
    }

    /**
    Attempt to select a piece of Equipment based on the mouse position
    returns: true if equipment was selected, false otherwise
    */
    selectEquipment(){
        let equip = this.findEquipmentByPosition(this.experimentMousePos(), this.selectedActor, true);
        if(equip === null) return false;
        if(this.selectedActor === null) this.setSelectedActor(equip);
        else if(this.selectedReceiver === null) this.setSelectedReceiver(equip);
        else return false;
        return true;
    }

    /**
    Call to activate a specific function on the selected EquipmentController
    id: The function ID to use for the selected EquipmentController
    receiver: Optional, the ExperimentObject to send with the function
    returns: true if the function is activated, false otherwise
    */
    selectedEquipFunction(id, receiver = null){
        let actor = this.selectedActor;
        if(actor === null || actor === undefined) return false;
        let func = actor.idToFunc(id);
        if(func === null || func === undefined) return false;
        if(receiver === null) receiver = this.selectedReceiver;
        func.bind(actor, receiver)();
        return true;
    }

    /**
    Unselect the selected actor and receiver
    */
    clearSelected(){
        this.setSelectedActor(null);
        this.setSelectedReceiver(null);
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
    Update the position of the object being moved by the mouse
    */
    updateMovingEquipmentPos(){
        let eq = this.movingEquipment;
        if(eq !== null){
            var pos = this.experimentMousePos();
            pos[0] += this.movingEquipAnchor[0];
            pos[1] += this.movingEquipAnchor[1];
            eq.equipment.setPosition(pos, EXP_CAMERA_OUTLINE_BOUNDS);
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
            let act = ins.actor;
            let rec = ins.receiver;
            let pEqs = this.placedEquipment;
            let eqs = this.experiment.equipment;

            // Check to ensure that the Instruction's ExperimentObject has been placed in the lab, if possible
            // If either object can be placed and it's not placed, place it
            var adds = [];
            if(act.canPlace() && !pEqs.includes(act)) adds.push(act);
            if(rec !== null && rec !== undefined && rec.canPlace() && !pEqs.includes(rec)) adds.push(rec);
            var success = true;
            // TODO Move this loop to its own function
            for(var i = 0; i < adds.length; i++){
                let index = eqs.indexOf(adds[i]);
                // If there is no valid index, do nothing
                if(index < 0){
                    success = false;
                    break;
                }

                // Otherwise, place the object at the center of the screen
                let eq = eqs[index];
                let pos = this.camera.pos;
                eq.setCenter(
                    pos[0] + EXP_BOUNDS[2] * (0.2 + 0.3 * Math.random()),
                    pos[1] + EXP_BOUNDS[3] * (0.2 + 0.3 * Math.random())
                );
                if(!this.placeEquipment(index)){
                    success = false;
                    break;
                }
            }
            if(!success) return;

            insC.activate();
            this.instructionCounter++;
        }
    }

    /**
    Set the DisplayBoxList to EquipmentBoxList instead of the ChemicalBoxList
    */
    displayEquipmentBoxes(){
        this.displayedBoxList = this.equipmentBoxes;
    }

    /**
    Determine if the EquipmentBoxList is being displayed
    returns: true if the list is displayed, false otherwise
    */
    isDisplayEquipment(){
        return this.equipmentBoxes === this.displayedBoxList;
    }

    /**
    Set the ChemicalBoxList to EquipmentBoxList instead of the DisplayBoxList
    */
    displayChemicalBoxes(){
        this.displayedBoxList = this.chemicalBoxes;
        this.equipmentBoxes.unselect();
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
    returns: true if the Equipment could be placed, false otherwise
    */
    placeEquipment(index){
        let eqs = this.experiment.equipment;
        let pEqs = this.placedEquipment;
        let boxes = this.equipmentBoxes;
        if(index < 0 || index > eqs.length - 1) return false;
        let toAdd = eqs[index];
        if(!pEqs.includes(toAdd)){
            pEqs.push(toAdd);
            // Remove the placed equipment from the equipment boxes
            boxes.remove(toAdd);
            return true;
        }
        return false;
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
        this.selectedActor = null;
        this.selectedReceiver = null;
        this.instructionCounter = 0;

        this.camera.reset();

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
        this.displayEquipmentBoxes();

        // Reset the disposers
        this.experiment.disposers = [];
        let disposers = this.experiment.disposers;
        let trashcan = idToEquipment(ID_EQUIP_TRASHCAN);
        trashcan.equipment.setPosition([EXP_BOUNDS_X_OFFSET + 20, EXP_BOUNDS_Y_OFFSET + 20]);
        disposers.push(trashcan);
    }

    /**
    Find a piece of Equipment in the lab which contains a point of the Equipment placed in this Controller's placed Equipment
    p: The point, a list of [x, y] coordinates
    exclude: A specific object to ignore, or a list of objects to ignore, or null to ignore none, default null
    searchMisc: true to search all of the placedEquipment and other constant Equipment, false to search only placedEquipment, default false
    returns: The piece of equipment, or null if none is found
    */
    findEquipmentByPosition(p, exclude = null, searchMisc = false){
        let searchArr = (searchMisc) ? this.placedEquipment.concat(this.experiment.disposers) : this.placedEquipment;
        for(var i = 0; i < searchArr.length; i++){
            var eq = searchArr[i];
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
        return this.camera.moveX(mouseX - EXP_BOUNDS[0]);
    }

    /**
    Get the y position of the mouse based on the position of the rendered Experiment
    */
    experimentMouseY(){
        return this.camera.moveY(mouseY - EXP_BOUNDS[1]);
    }

    /**
    Get the y position of the mouse based on the position of the rendered Experiment
    */
    experimentMousePos(){
        return [this.experimentMouseX(), this.experimentMouseY()];
    }

    /**
    Determine if the Mouse is inside the bounds of the Experiment
    returns: true if in bounds, false otherwise
    */
    experimentContainsMouse(){
        return pointInRect2D(EXP_BOUNDS, [mouseX, mouseY]);
    }

    /**
    Get the rectangular bounds of the region of the Experiment which will be rendered, based on camera position
    returns: The bounds as a list [far left x, upper y, width, height]
    */
    experimentRenderBounds(){
        return [this.camera.pos[0], this.camera.pos[1], EXP_BOUNDS[2], EXP_BOUNDS[3]];
    }

    /**
    Call when the mouse is pressed
    */
    mousePress(){
        // Whenever a mouse button is pressed, always unselect the EquipmentBox
        this.equipmentBoxes.unselect();

        // Handle left click, for moving objects
        if(mouseButton === LEFT){
            // If the mouse is inside the Experiment, attempt to make a selection for moving an Equipment
            if(this.experimentContainsMouse()){
                // If there is no selection made for movement, make a selection
                if(this.movingEquipment === null) this.setMovingEquipment(this.findEquipmentByPosition(this.experimentMousePos(), null, false));
            }
            // If the mouse is outside the bounds, attempt to select an EquipmentBox
            else{
                // Select an EquipmentBox
                if(this.isDisplayEquipment()) this.equipmentBoxes.selectBox();
                // Select a ChemicalBox
                else if(this.isDisplayChemicals()) this.chemicalBoxes.selectBox();
            }
        }
        // Handle right click, for selecting objects
        else if(mouseButton === RIGHT){
            // If in the Experiment bounds, check for object interaction
            if(this.experimentContainsMouse()){
                // Attempt to select a piece of Equipment
                this.selectEquipment();
            }
        }
    }

    /**
    Call when the mouse is released
    */
    mouseRelease(){
        // Handle left click, for moving objects
        if(mouseButton === LEFT){
            // See if the Equipment boxes should be placed or unselected
            this.updateEquipmentBoxPlacement();

            // Stop moving a piece of Equipment inside the Experiment on mouse release
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
        this.updateEquipmentBoxMovement();

        // Update the position of the object being moved by the mouse
        this.updateMovingEquipmentPos();
    }

    /**
    Call when a key on the keyboard is released
    */
    keyRelease(){
    }

    /**
    Call when a key on the keyboard is pressed
    */
    keyPress(){
        // TODO this is just temporary controls via keyboard
        let k = key;
        if(k >= '1' && k <= '9'){
            if(this.selectedActor !== null && (this.selectedReceiver !== null || keyIsDown(ALT))){
                var funcID = parseInt(k);
                this.selectedEquipFunction(funcID);
                this.setSelectedActor(null);
                this.setSelectedReceiver(null);
            }
        }
        switch(keyCode){
            case KEY_EXP_RESET_SELECTED: this.clearSelected(); break;
            case KEY_EXP_NEXT_INSTRUCTION: this.nextInstruction(); break;
            case KEY_EXP_RESET: this.reset(); break;
            case KEY_EXP_DISPLAY_CHEMS: this.displayChemicalBoxes(); break;
            case KEY_EXP_DISPLAY_EQUIPS: this.displayEquipmentBoxes(); break;

            case KEY_EXP_ADD_CHEM_1:
            case KEY_EXP_ADD_CHEM_5:
            case KEY_EXP_ADD_CHEM_10:
            case KEY_EXP_ADD_CHEM_20:
            case KEY_EXP_ADD_CHEM_25: this.addChemicalToSelectedBeaker(keyCode); break;
            default: break;
        }
    }

    /**
    TODO this is a temporary method for use only with Containers, it does nothing if it is not an instance of Container
    Take the selected Equipment, assume it is a Container, and add a Chemical to it
    massIndex: The index for which mass size to use
    */
    addChemicalToSelectedBeaker(massIndex){
        if(!(this.selectedActor instanceof ContainerController2D)) return;
        let box = this.chemicalBoxes.selected;
        if(box === null) return;
        let chemControl = box.obj;
        if(chemControl === null) return;
        var mass;
        switch(massIndex){
            case KEY_EXP_ADD_CHEM_1: mass = 0.1; break;
            case KEY_EXP_ADD_CHEM_5: mass = 1; break;
            case KEY_EXP_ADD_CHEM_10: mass = 5; break;
            case KEY_EXP_ADD_CHEM_20: mass = 10; break;
            case KEY_EXP_ADD_CHEM_25: mass = 50; break;
            default: mass = null; break;
        }
        if(mass === null) return;
        chemControl.chemical.setMass(mass * (1 + (Math.random() - 0.5) * 2 * 0.05));
        this.selectedEquipFunction(ID_FUNC_CONTAINER_ADD_TO, chemControl);
    }

    /**
    Based on the currently pressed keys, update the position of the camera
    */
    updateCameraPos(){
        if(keyIsDown(KEY_EXP_PAN_CAMERA_LEFT)) this.camera.left();
        if(keyIsDown(KEY_EXP_PAN_CAMERA_RIGHT)) this.camera.right();
        if(keyIsDown(KEY_EXP_PAN_CAMERA_UP)) this.camera.up();
        if(keyIsDown(KEY_EXP_PAN_CAMERA_DOWN)) this.camera.down();
    }

    /**
    Update the status of the EquipmentBoxList to move the box the the correct location based on the mouse.
    */
    updateEquipmentBoxMovement(){
        if(this.isDisplayEquipment()) this.equipmentBoxes.updateSelectPos();
    }

    /**
    Attempt to place the selected EquipmentBox into the simulation, or deselect it.
    */
    updateEquipmentBoxPlacement(){
        // Only update the box if the EquipmentBoxes are displaying
        if(this.isDisplayEquipment()){
            // If the mouse is inside the experiment, attempt to add the Equipment from the Equipment boxes
            if(this.experimentContainsMouse()) this.equipmentBoxes.place(this);
            // Otherwise, just unselect the box
            else this.equipmentBoxes.unselect();
        }
    }

    /**
    Update the current state of the simulation by one frame
    */
    update(){
        // Update all Equipment currently in the simulation
        let eqs = this.placedEquipment;
        eqs.forEach(function(eq){
            eq.update();
        });

        // Update all of the Disposers
        this.experiment.disposers.forEach(function(disposer){
            disposer.update();
        });

        // Move camera based on which buttons are held down
        this.updateCameraPos();

        // Update the position of the object being moved by the mouse
        this.updateMovingEquipmentPos();
    }

    /**
    Draw the full Experiment
    canvasGraphics: The P5 canvas to draw
    */
    render(canvasGraphics){
        if(this.graphics === null) return;

        // Convenience variables for rendering
        let exp = this.experiment;
        let placed = this.placedEquipment;
        let eqs = exp.equipment;
        let r = EXP_BOUNDS;
        let expG = this.experimentGraphics;
        let g = this.graphics;
        let selAct = this.selectedActor;
        let selRec = this.selectedReceiver;

        // Fill in a background
        g.background(CANVAS_BACKGROUND_COLOR);

        // Draw the area containing the interactable portion of the Experiment
        expG.push();
        expG.background(EXP_BACKGROUND_COLOR);

        // Translate the graphics to the camera
        this.camera.translateGraphics(expG);

        // draw a border around the experiment
        expG.noFill();
        expG.stroke(EXP_BORDER_COLOR);
        expG.strokeWeight(EXP_BORDER_SIZE);
        let camB = EXP_CAMERA_OUTLINE_BOUNDS;
        expG.rect(camB[0], camB[1], camB[2], camB[3]);

        // Draw the lab table
        // TODO

        // Draw the disposal area
        // TODO

        // Draw all of the Disposers
        this.experiment.disposers.forEach(function(disposer){
            disposer.draw(expG);
        });

        // Draw objects on the lab table
        // Draw all not selected equipment
        let cameraBounds = this.experimentRenderBounds();
        for(var i = 0; i < placed.length; i++){
            let p = placed[i];
            if(p !== selAct && p !== selRec && p.shouldRender(cameraBounds)){
                p.draw(expG);
            }
        }
        // Draw the selected equipment if it exists
        this.drawSelectedIndicator(selAct, true, expG);
        this.drawSelectedIndicator(selRec, false, expG);

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

        // reset the state of the translate graphics
        expG.pop();

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

        // TODO remove, only here for testing purposes
        // Draw instructions
        g.fill(200);
        g.noStroke();
        g.textSize(18);
        var y = 450;
        let x = 650;
        g.text("Left click equipment to move it", x, y += 20);
        g.text("Right click a equipment to select, blue = actor, green = receiver", x, y += 20);
        g.text("Press ESC to unselect selected Equipment", x, y += 20);
        g.text("Press 1 - 9 to perform actions on selected actor and receiver", x, y += 20);
        g.text("Also hold alt and press 1 - 9 to perform actions on only selected actor", x, y += 20);
        g.text("Press 1, 2, 3, 4, 5 to add .1, 1, 5, 10, or 50 units to selected container", x, y += 20);
        g.text("\tChemicals added have 0% to 5% error", x, y += 20);
        g.text("Press I to run the next instruction", x, y += 20);
        g.text("Press R to reset the simulation", x, y += 20);
        g.text("Press C to view Chemical tab, then click a chemical to select", x, y += 20);
        g.text("Press V to view Equipment tab, then click and drag to add equipment", x, y += 20);
        g.text("Use arrow keys to move camera", x, y += 20);

        // Draw the list of possible actions for the selected actor
        if(this.selectedActor !== null){
            // TODO make render constants
            // TODO Place this code in equipmentController2D
            let options = selAct.getFuncDescriptions();
            g.textSize(16);
            let baseX = mouseX + 15;
            let baseY = mouseY;
            for(var i = 0; i < options.length; i++){
                let s = (i + 1) + ": " + options[i];

                g.strokeWeight(1);
                g.stroke(0);
                g.fill(255);
                g.rect(baseX - 2, baseY + (i - 1) * 18 + 3, g.textWidth(s) + 6, 18);

                g.noStroke();
                g.fill(0);
                g.text(s, baseX, baseY + i * 18);
            }
        }

        // Draw the final graphics image to the canvas
        canvasGraphics.image(g, 0, 0);
    }

    /**
    Draw the indicator for which object is selected. Does nothing if obj is null.
    obj: The object to draw, should always be an EquipmentController2D
    isActor: true if obj should get the details for a selected actor, false for a selected receiver
    g: The graphics object used to draw
    */
    drawSelectedIndicator(obj, isActor, g){
        if(obj === null) return;
        obj.draw(g);
        // Draw a box around the selected equipment and draw it on top of all other equipment
        g.noFill();
        g.stroke((isActor) ? EXP_EQUIP_SELECT_ACTOR_STROKE_COLOR : EXP_EQUIP_SELECT_RECEIVER_STROKE_COLOR);
        g.strokeWeight(EXP_EQUIP_SELECT_STROKE_WEIGHT);
        g.rect(obj.x(), obj.y(), obj.width(), obj.height());
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
    returns: The DisplayBox's object
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
        return success;
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
                success = expControl.placeEquipment(index);
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

        // Determine the height and width to draw the image for the box
        let img = this.getImage();
        let w = img.width;
        let h = img.height;
        var dw;
        var dh;
        if(w > h){
            dw = IMG_SIZE;
            dh = (dw / w) * h;
        }
        else{
            dh = IMG_SIZE;
            dw = (dh / h) * w;
        }

        let midX = r[0] + IMG_OFF + IMG_SIZE * 0.5;
        let midY = r[1] + IMG_OFF + IMG_SIZE * 0.5;

        g.push();
        g.imageMode(CENTER);
        g.image(img, midX, midY, dw, dh);
        g.pop();
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


/**
A class used by ExperimentController2D to move the canvas around
*/
class ExperimentCamera{

    /**
    Create a new default ExperimentCamera
    basePos: A list of 2 values [x, y] of the initial position of the ExperimentCamera. Use null for [0, 0], default null
    bounds: A list of 4 values, [far left x, upper y, width, height] for the maximum values this camera can take up.
        Use null for no boundaries, Default null.
    */
    constructor(basePos = null, bounds = null){
        this.pos = null;
        this.basePos = basePos;
        this.speed = [6, 6];
        this.bounds = bounds;
        this.reset();
    }

    /**
    Bring this Camera to its default state
    */
    reset(){
        let b = this.basePos;
        this.pos = (b === null) ? [0, 0] : [b[0], b[1]];
        this.bound();
    }

    /**
    Set the position of this ExperimentCamera, also keeps position in bounds
    pos: The new position, a list of 2 values [x, y]
    */
    setPos(pos){
        this.pos = pos;
        this.bound();
    }

    /**
    Set the default position of this ExperimentCamera
    pos: The new position, a list of 2 values [x, y]
    */
    setBasePos(pos){
        this.basePos = pos;
    }

    /**
    Set the speed of this ExperimentCamera for movement
    speed: The new speed, a list of 2 values [x speed, y speed]
    */
    setSpeed(speed){
        this.speed = speed;
    }

    /**
    Set the bounds of this ExperimentCamera, where the camera can exist. Set to null to not use bounds.
    bounds: The new bounds, a list of 4 values [far left x, upper y, width, height]
    */
    setBounds(bounds){
        this.bounds = bounds;
    }

    /**
    Get the x coordinate as translated by this ExperimentCamera
    x: The x coordinate to translate
    returns: The translated x coordinate
    */
    moveX(x){
        return x + this.pos[0];
    }

    /**
    Get the y coordinate as translated by this ExperimentCamera
    y: The y coordinate to translate
    returns: The translated y coordinate
    */
    moveY(y){
        return y + this.pos[1];
    }

    /**
    If the camera's x value is outside the bounds on the x axis, snap it to the closest edge.
    */
    boundX(){
        if(this.bounds === null) return;
        if(this.pos[0] < this.bounds[0]) this.pos[0] = this.bounds[0];
        let edge = this.bounds[0] + this.bounds[2];
        if(this.pos[0] > edge) this.pos[0] = edge;
    }

    /**
    If the camera's y value is outside the bounds on the y axis, snap it to the closest edge.
    */
    boundY(){
        if(this.bounds === null) return;
        if(this.pos[1] < this.bounds[1]) this.pos[1] = this.bounds[1];
        let edge = this.bounds[1] + this.bounds[3];
        if(this.pos[1] > edge) this.pos[1] = edge;
    }

    /**
    If the camera's x or y value is outside the bounds, snap it to the closest edge.
    */
    bound(){
        this.boundX();
        this.boundY();
    }

    /**
    Move this ExperimentCamera to the left by the given amount
    x: The amount to move, default: the camera speed
    */
    left(x = this.speed[0]){
        this.pos[0] += x;
        this.boundX();
    }

    /**
    Move this ExperimentCamera to the right by the given amount
    x: The amount to move, default: the camera speed
    */
    right(x = this.speed[0]){
        this.pos[0] -= x;
        this.boundX();
    }

    /**
    Move this ExperimentCamera up by the given amount
    y: The amount to move, default: the camera speed
    */
    up(y = this.speed[1]){
        this.pos[1] += y;
        this.boundY();
    }

    /**
    Move this ExperimentCamera down by the given amount
    y: The amount to move, default: the camera speed
    */
    down(y = this.speed[1]){
        this.pos[1] -= y;
        this.boundY();
    }

    /**
    Translate the given P5 graphics by the position of this ExperimentCamera
    g: The P5 graphics
    */
    translateGraphics(g){
        g.translate(-this.pos[0], -this.pos[1]);
    }

}