var mainExperiment = null;
var mainExpController = null;
var mainExpCanvas = null;

// true to load data from the actual database, false to use test data defined by the return of getTestJSON()
let LOAD_EXPERIMENT_FROM_SERVER = false;

/*

TODO:
    Test cases ExperimentObjectController2D.getFuncDescriptions, ChemicalController2D.getFuncDescriptions,
        ContainerController2D.getFuncDescriptions, DisposerController2D.getFuncDescriptions
    Allow users to select different actions for each piece of equipment
        Right click second, show options for the two interacting, allow them to be clicked
    Create system for making Experiment Instructions
    Allow equipment to be disposed via sink
    Add way to add chemicals to containers over time
    Fix bug where left clicking one Equipment, then while dragging, right click, makes the equipment not get unselected on letting go of left click
    Make basic layout for Experiment
        Update clicking and dragging to change indexes for ExperimentBoxes when they are removed from the list
        Split Experiment render code into individual methods
    Optimize performance of searching for adding and removing Equipment, pick a better data structure
    Create a method to render a static loading screen while the simulator loads
    Add sample animation

*/

/**
P5.js function, called when script is initially loaded
*/
function setup(){
    // Create the canvas
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(50, 50, "relative");

    // Set the frame rate
    frameRate(EXPERIMENT_FRAME_RATE);

    // Set up control constants from RenderConstants2D
    setUpControlConstants();

    // Create the experiment graphics
    mainExpCanvas = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);

    // Load image assets
    loadImages();

    // Grab data from session storage
    loadSessionData();
}

/**
Initialize the experiment and controller objects from the session data
*/
function initExperiment(data){
    if(LOAD_EXPERIMENT_FROM_SERVER) mainExperiment = parseExperiment(data);
    else mainExperiment = parseExperiment(getTestJSON());
    mainExpController = new ExperimentController2D(mainExperiment, true);
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    if(mainExpController !== null){
        mainExpController.update();

        mainExpController.render(mainExpCanvas);
        image(mainExpCanvas, 0, 0);
    }
}

/**
P5.js function, called when a mouse button is held down
*/
function mousePressed(){
    if(mainExpController !== null) mainExpController.mousePress();
}

/**
P5.js function, called when a mouse button is let go
*/
function mouseReleased(){
    if(mainExpController !== null) mainExpController.mouseRelease();
}

/**
P5.js function, called when the mouse is moved, not dragged
*/
function mouseMoved(){
    if(mainExpController !== null) mainExpController.mouseMove();
}

/**
P5.js function, called when the mouse is dragged, not moved
*/
function mouseDragged(){
    if(mainExpController !== null) mainExpController.mouseDrag();
}

/**
P5.js function, called when a key on the keyboard is pressed
*/
function keyPressed(){
    if(mainExpController !== null) mainExpController.keyPress();
}

/**
P5.js function, called when a key on the keyboard is released
*/
function keyReleased(){
    if(mainExpController !== null) mainExpController.keyRelease();
}

/**
Function to stop the right click menu from showing up
*/
document.oncontextmenu = function(){
    // TODO still should activate this normally when mouse is not inside P5 canvas
    return false;
}