var experiment;
var expController;

/*

TODO:
    Give test cases constant spacing
    Reword docs to reflect controller names
    Should chemicals even have an id?
    Modify ExperimentController2D code to handle abstraction as described by the TO DO comments
        Set it up so that each piece of equipment has a list of interaction methods
        So it would be actor and receiver methods?

*/


/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    expController = new ExperimentController2D(experiment);

    experiment.equipment.push(new BeakerController2D(new Beaker([50, 200], [200, 200], 20.0, 50.0, 0.03, 1)));
    experiment.equipment.push(new BeakerController2D(new Beaker([300, 200], [200, 200], 20.0, 50.0, 0.03, 2)));
    experiment.equipment.push(new BeakerController2D(new Beaker([550, 200], [200, 200], 20.0, 50.0, 0.03, 3)));

    let eqs = experiment.equipment;
    var ins = [];
    ins.push(new InstructionController2D(new Instruction(eqs[0], new Chemical(5, "small chem", "", 20, [255, 0, 0]), eqs[0].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], new Chemical(5, "small chem", "", 20, [0, 0, 255]), eqs[1].addTo)));
    ins.push(new InstructionController2D(new Instruction(eqs[0], eqs[1], eqs[0].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[1], eqs[2], eqs[1].pourInto)));
    ins.push(new InstructionController2D(new Instruction(eqs[2], new Chemical(20, "big chem", "", 20, [255, 255, 255]), eqs[2].addTo)));
    expController.setInstructions(ins);
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