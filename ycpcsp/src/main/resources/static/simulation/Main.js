var mainExperiment;
var mainExpController;

/*

TODO:
    Test cases ExperimentObjectController2D.idToFunc
    Test cases ChemicalController2D.idToFunc
    Test cases ContainerController2D.idToFunc
    Test cases Experiment.setChemicals, constructor(update with chemicals)
    Test cases DataLoader
    Test cases InstanceID
    Allow backend to send a json file to session storage
    Make parser for front end Experiment to backend json
    Remove instanceID parameter, replace it with an instanceID incrementer
    Make proper layout page with home button
    Test cases: ExperimentController2D.selectedEquipFunction, setMovingEquipment
    Create code for Chemicals, display a Chemical tab
    Move beaker specific code to BeakerController, func should be an ID
    Make test cases use a before method
    Make a better way of Chemicals in Instructions to keep their stats so they don't change, or maybe have a reset?
    Make basic layout for Experiment
        Update clicking and dragging to change indexes for ExperimentBoxes when they are removed from the list
        Split Experiment render code into individual methods
        Store and display list of available Chemicals
    Add camera panning
        Use x and y camera coordinates in the ExperimentController2D
        Use P5 translate for graphics
        Create global function to get x and y mouse positions
        Objects which will not be on the screen should not be rendered, i.e. a renderBounds() method
        Objects in the experiment should be forced to stay within the experiment bounds
    Allow chemicals to be disposed
    Optimize performance of searching for adding and removing Equipment, pick a better data structure
    Modify ExperimentController2D code to handle abstraction as described by the TO DO comments
        Set it up so that each piece of equipment has a list of interaction methods
        So it would be actor and receiver methods?

*/

/**
P5.js function, called when script is initially loaded
*/
function setup(){
    // First load image assets
    loadImages();

    // Grab data from session storage
    loadSessionData();
    //let data = sessionStorage.getItem(SESSION_EXPERIMENT_NAME);
    let data = JSON.parse(sessionStorage.getItem(SESSION_EXPERIMENT_NAME));

    let mainExperiment = parseExperiment(data);

    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(50, 50, "relative");

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