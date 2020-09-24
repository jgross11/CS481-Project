var experiment;
var expController;

/*

TODO:
    Make test cases for Equipment x, y, width, height

*/


/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();
    expController = new ExperimentController2D(experiment);

    experiment.equipment.push(new BeakerController2D(new Beaker([400, 200], [200, 200], 20.0, 50.0, 0.01, "Test Beaker 1")));
    experiment.equipment.push(new BeakerController2D(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 2")));
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