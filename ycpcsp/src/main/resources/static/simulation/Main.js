var mainExperiment;
var mainExpController;

/*

TODO:
    Make proper layout page with home button
    Create code for Chemicals, display a Chemical tab
    Allow users to select different actions for each piece of equipment
    Allow equipment and chemicals to be disposed
    Make a better way of Chemicals in Instructions to keep their stats so they don't change, or maybe have a reset?
    Add camera panning
        Use x and y camera coordinates in the ExperimentController2D
        Use P5 translate for graphics
        Create global function to get x and y mouse positions
        Objects which will not be on the screen should not be rendered, i.e. a renderBounds() method
        Objects in the experiment should be forced to stay within the experiment bounds
    Make basic layout for Experiment
        Update clicking and dragging to change indexes for ExperimentBoxes when they are removed from the list
        Split Experiment render code into individual methods
    Optimize performance of searching for adding and removing Equipment, pick a better data structure
    Create a method to render a static loading screen while the simulator loads

*/

/**
P5.js function, called when script is initially loaded
*/
function setup(){
    // Create the canvas
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(50, 50, "relative");

    // First load image assets
    loadImages();

    let testData = getTestJSON();
    //console.log(testData); // TODO
    let exp = parseExperiment(testData);
    //console.log(exp); // TODO
    let expJSON = experimentToJSON(exp);
    //console.log(expJSON); // TODO

    // Grab data from session storage
    loadSessionData();
    //let data = sessionStorage.getItem(SESSION_EXPERIMENT_NAME);
    let data = JSON.parse(sessionStorage.getItem(SESSION_EXPERIMENT_NAME));

    let mainExperiment = parseExperiment(data);

    mainExpController = new ExperimentController2D(mainExperiment, true);
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

/**
Function to stop the right click menu from showing up
*/
document.oncontextmenu = function(){
    // TODO still should activate this normally when mouse is not inside P5 canvas
    return false;
}