var mainExperiment;
var mainExpController;

/*

TODO:
    Test case: ExperimentController2D.experimentMouseX, experimentMouseY, experimentMousePos, equipSquareBounds,
        mouseRelease, mouseDragged
    Test case: EquipmentController2D.setCenter
    Make basic layout for Experiment
        Split mouse and keyboard input into separate methods
        Make clicking based on left click specifically
        Make Equipment already in the Experiment not show up in the Equipment list
        Split Experiment render code into individual methods
    Add camera panning
        Use x and y camera coordinates in the ExperimentController2D
        Use P5 translate for graphics
        Create global function to get x and y mouse positions
        Objects which will not be on the screen should not be rendered, i.e. a renderBounds() method
    Optimize performance of searching for adding and removing Equipment, pick a better data structure
    Create code for Chemicals
    Modify ExperimentController2D code to handle abstraction as described by the TO DO comments
        Set it up so that each piece of equipment has a list of interaction methods
        So it would be actor and receiver methods?

*/

/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    loadImages();
    mainExperiment = new Experiment("Test Experiment", "Personus Namington");
    mainExpController = new ExperimentController2D(mainExperiment, true);

    mainExperiment.equipment.push(new BeakerController2D(new Beaker([50, 200], [100, 100], 20.0, 50.0, 0.03, 1)));
    mainExperiment.equipment.push(new BeakerController2D(new Beaker([300, 200], [100, 100], 20.0, 50.0, 0.03, 2)));
    mainExperiment.equipment.push(new BeakerController2D(new Beaker([550, 200], [100, 100], 20.0, 50.0, 0.03, 3)));

    let chem1 = new ChemicalController2D(new Chemical(5, "", 20, [255, 0, 0]));
    let chem2 = new ChemicalController2D(new Chemical(5, "", 20, [0, 0, 255]));
    let chem3 = new ChemicalController2D(new Chemical(20, "", 20, [255, 255, 255]));

    let eqs = mainExperiment.equipment;
    var ins = [];
    ins.push(new InstructionController2D(new Instruction(eqs[0], chem1, eqs[0].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], chem2, eqs[1].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], eqs[2], eqs[1].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[2], chem3, eqs[2].addTo)));
    mainExpController.setInstructions(ins);
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    mainExpController.render();
}

/**
P5.js function, called when a mouse button is held down
*/
function mousePressed(){
    mainExpController.mousePress();
}

/**
P5.js function, called when a mouse button is let go
*/
function mouseReleased(){
    mainExpController.mouseRelease();
}

/**
P5.js function, called when the mouse is moved, not dragged
*/
function mouseMoved(){
    mainExpController.mouseMove();
}

/**
P5.js function, called when the mouse is dragged, not moved
*/
function mouseDragged(){
    mainExpController.mouseDrag();
}

/**
P5.js function, called when a key on the keyboard is pressed
*/
function keyPressed(){
    mainExpController.keyPress();
}