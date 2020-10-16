var mainExperiment = null;
var mainExpController = null;

/*

TODO:
    Create code for Chemicals, display a Chemical tab
        Click on a chemical to be able to add it to a beaker, any amount, use func ids
    Test cases ChemicalBox, EquipmentBox.getImage, DisplayBox, ExperimentController2D.isDisplayEquipment, isDisplayChemicals
        Need to allow them to turn graphics on or off, add main to test cases?
    Remove things like size and position from the Beaker constructor
    Add camera panning
        Use x and y camera coordinates in the ExperimentController2D
        Use P5 translate for graphics
        Create global function to get x and y mouse positions
        Objects which will not be on the screen should not be rendered, i.e. a renderBounds() method
        Objects in the experiment should be forced to stay within the experiment bounds
    Allow users to select different actions for each piece of equipment
    Make a better way of Chemicals in Instructions to keep their stats so they don't change, or maybe have a reset?
    Add update method for each object
    Allow equipment and chemicals to be disposed
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

    // Grab data from session storage
    loadSessionData();
}

/**
Initialize the experiment and controller objects from the session data
*/
function initExperiment(data){
    mainExperiment = parseExperiment(data);
    mainExpController = new ExperimentController2D(mainExperiment, true);
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    if(mainExpController !== null) mainExpController.render();
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
Function to stop the right click menu from showing up
*/
document.oncontextmenu = function(){
    // TODO still should activate this normally when mouse is not inside P5 canvas
    return false;
}