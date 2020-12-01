var mainExperiment = null;
var mainExpController = null;
var mainExpCanvas = null;

// true to load data from the actual database, false to use test data defined by the return of getTestJSON()
let LOAD_EXPERIMENT_FROM_SERVER = true;

/**
P5.js function, called when script is initially loaded
*/
function setup(){
    // Create the canvas
    let canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.position(CANVAS_X_OFFSET, CANVAS_Y_OFFSET, CANVAS_POSITION_MODE);

    // Set the frame rate
    frameRate(EXPERIMENT_FRAME_RATE);

    // Grab data from session storage
    loadSessionData();
}

/**
Initialize the experiment and controller objects from the session data
*/
function initExperiment(data){
    // Set up control constants from RenderConstants2D
    setUpControlConstants();

    // Load image assets
    loadImages();

    // Create the experiment graphics
    mainExpCanvas = createGraphics(CANVAS_WIDTH, CANVAS_HEIGHT);

    if(LOAD_EXPERIMENT_FROM_SERVER) mainExperiment = parseExperiment(data);
    else{
        // Set up chemical properties test database
        initTestChemProperties();
        mainExperiment = parseExperiment(getTestJSON());
    }

    // Create the experiment object proper
    mainExpController = new ExperimentController2D(mainExperiment, true);
}

/**
P5.js function, called when screen is redrawn
*/
function draw(){
    // If the experiment has not yet loaded, draw the loading screen
    if(mainExpController === null){
        drawLoadingScreen();
    }
    // Otherwise, draw the simulation
    else{
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
Draw the loading screen while the experiment loads
*/
function drawLoadingScreen(){
    background(LOADING_SCREEN_BACKGROUND_COLOR);
    stroke(LOADING_SCREEN_TEXT_STROKE_COLOR);
    strokeWeight(LOADING_SCREEN_TEXT_STROKE_WEIGHT);
    textSize(LOADING_SCREEN_TEXT_SIZE)
    fill(LOADING_SCREEN_TEXT_COLOR);
    text(LOADING_SCREEN_TEXT,
        (CANVAS_WIDTH - textWidth(LOADING_SCREEN_TEXT)) * 0.5,
        (CANVAS_HEIGHT + LOADING_SCREEN_TEXT_SIZE) * 0.5);
}

/**
Function to stop the right click menu from showing up.
return: true if the mouse is outside the P5 canvas, false otherwise
*/
document.oncontextmenu = function(){
    return !pointInRect2D([0, 0, CANVAS_WIDTH, CANVAS_HEIGHT], [mouseX, mouseY]);
}