var mainExperiment;
var mainExpController;

/*

TODO:
    Disallow ExperimentController2D.addEquipment, placeEquipment from adding duplicate entries
        update test cases
    Make basic layout for experiment
        Make constants for positions of unmoving features of the layout
        Allow equipment to be clicked and dragged to be added to the Experiment
        Make Equipment already in the Experiment not show up in the Equipment list
    Create code for Chemicals
    Modify ExperimentController2D code to handle abstraction as described by the TO DO comments
        Set it up so that each piece of equipment has a list of interaction methods
        So it would be actor and receiver methods?

*/

// Constants for the P5 canvas

// The width of the canvas being displayed
let CANVAS_WIDTH = 1280;
// The height of the canvas being displayed
let CANVAS_HEIGHT = 720;


/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

    loadImages();
    mainExperiment = new Experiment("Test Experiment", "Personus Namington");
    mainExpController = new ExperimentController2D(mainExperiment);

    mainExperiment.equipment.push(new BeakerController2D(new Beaker([50, 200], [200, 200], 20.0, 50.0, 0.03, 1)));
    mainExperiment.equipment.push(new BeakerController2D(new Beaker([300, 200], [200, 200], 20.0, 50.0, 0.03, 2)));
    mainExperiment.equipment.push(new BeakerController2D(new Beaker([550, 200], [200, 200], 20.0, 50.0, 0.03, 3)));

    let eqs = mainExperiment.equipment;
    var ins = [];
    ins.push(new InstructionController2D(new Instruction(eqs[0], new Chemical(5, "", 20, [255, 0, 0]), eqs[0].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], new Chemical(5, "", 20, [0, 0, 255]), eqs[1].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], eqs[2], eqs[1].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[2], new Chemical(20, "", 20, [255, 255, 255]), eqs[2].addTo)));
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
P5.js function, called when the mouse is moved, not dragged
*/
function mouseMoved(){
    mainExpController.mouseMove();
}

/**
P5.js function, called when a key on the keyboard is pressed
*/
function keyPressed(){
    mainExpController.keyPress();
}