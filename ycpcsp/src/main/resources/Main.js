var experiment;


/*

TODO:
    Add test cases for Chemical
    Add draw test cases for BeakerController2D
    Add test cases for createController for ExperimentObject

*/


/**
P5.js function, called when script is initially loaded
*/
function setup(){
    createCanvas(800, 800);

    loadImages();
    experiment = new Experiment();

    experiment.equipment.push(new Beaker([400, 200], [200, 200], 20.0, 50.0, 0.01, "Test Beaker 1"));
    experiment.equipment.push(new Beaker([50, 200], [150, 150], 20.0, 50.0, 0.01, "Test Beaker 2"));
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    background(220);
    experiment.render();
}

/**
P5.js function, called when a mouse button is held down
*/
function mousePressed(){
    experiment.mousePress();
}

/**
P5.js function, called when the mouse is moved, not dragged
*/
function mouseMoved(){
    experiment.mouseMove();
}