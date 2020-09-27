var experiment;
var expController;

/*

TODO:
    Create system to run through a list of steps to complete an experiment
    Add a way to find ExperimentObjects by name, or add an ID to them

*/


/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    expController = new ExperimentController2D(experiment);

    experiment.equipment.push(new BeakerController2D(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 1")));
    experiment.equipment.push(new BeakerController2D(new Beaker([250, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 2")));
    experiment.equipment.push(new BeakerController2D(new Beaker([450, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 3")));

    let eqs = experiment.equipment;
    expController.setInstructions([new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto))]);
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    background(220);
    expController.render();
}

/**
P5.js function, called when a mouse button is held down
*/
function mousePressed(){
    expController.mousePress();
}

/**
P5.js function, called when the mouse is moved, not dragged
*/
function mouseMoved(){
    expController.mouseMove();
}

/**
P5.js function, called when a key on the keyboard is pressed
*/
function keyPressed(){
    expController.keyPress();
}