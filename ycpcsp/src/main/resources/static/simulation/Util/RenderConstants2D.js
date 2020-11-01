// Constants for the P5 canvas

// The frame rate of the Experiment simulator
let EXPERIMENT_FRAME_RATE = 60;

// The width of the canvas being displayed
let CANVAS_WIDTH = 1280;
// The height of the canvas being displayed
let CANVAS_HEIGHT = 800;
// The background color of the canvas
let CANVAS_BACKGROUND_COLOR = 120;
// The background color of the experiment
let EXP_BACKGROUND_COLOR = 60;

// The size of the border displayed at the edge of the Experiment
let EXP_BORDER_SIZE = 25;
// The color of the border displayed at the edge of the Experiment
let EXP_BORDER_COLOR = 40;
// The offset on the x axis of the experiment to the canvas
let EXP_BOUNDS_X_OFFSET = 0;
// The offset on the y axis of the experiment to the canvas
let EXP_BOUNDS_Y_OFFSET = 100;
// The width of the canvas which is not used by the experiment
let EXP_BOUNDS_WIDTH_OFFSET = 0;
// The height of the canvas which is not used by the experiment
let EXP_BOUNDS_HEIGHT_OFFSET = 200;
// A rectangular bounds of the space in the canvas which can be rendered, [x, y, width, height]
let EXP_BOUNDS = [
    EXP_BOUNDS_X_OFFSET,
    EXP_BOUNDS_Y_OFFSET,
    CANVAS_WIDTH - EXP_BOUNDS_WIDTH_OFFSET,
    CANVAS_HEIGHT - EXP_BOUNDS_HEIGHT_OFFSET
];
// A rectangular bounds of where the camera be placed, [x, y, width, height]
let EXP_CAMERA_BOUNDS = [
    EXP_BOUNDS[0], EXP_BOUNDS[1],
    EXP_BOUNDS[2], EXP_BOUNDS[3] * 0.5
];
// A rectangular bounds representing the space which is visible for the experiment, [x, y, width, height]
let EXP_CAMERA_OUTLINE_BOUNDS = [
    EXP_CAMERA_BOUNDS[0],
    EXP_CAMERA_BOUNDS[1],
    EXP_BOUNDS[2] + EXP_CAMERA_BOUNDS[2],
    EXP_BOUNDS[3] + EXP_CAMERA_BOUNDS[3]
];

// The stroke color of the outline used to indicate selected Equipment
let EXP_EQUIP_SELECT_ACTOR_STROKE_COLOR = [150, 150, 255, 160];
let EXP_EQUIP_SELECT_RECEIVER_STROKE_COLOR = [150, 255, 150, 160];
// The stroke weight of the outline used to indicate selected Equipment
let EXP_EQUIP_SELECT_STROKE_WEIGHT = 8;

// The size, width and height, of a box rendered for the available Equipment display
let EXP_BOX_SIZE = 70;
// The x axis offset, for a box rendered for the available Equipment display
let EXP_BOX_OFF_X = 10;
// The y axis offset, for a box rendered for the available Equipment display
let EXP_BOX_OFF_Y = -10;
// The relative size of drawn sprites on the Equipment display
let EXP_BOX_SPRITE_SIZE = 0.8;
// The color of the stroke of the outside of a rendered box
let EXP_BOX_STROKE_COLOR = 0;
// The weight of the stroke of the outside of a rendered box
let EXP_BOX_STROKE_WEIGHT = 3;
// The fill color of the inside of a rendered box
let EXP_BOX_FILL_COLOR = 200;
// The color used to display that a rendered box is selected
let EXP_BOX_SELECT_COLOR = [200, 200, 255, 200];


// Constants for equipment rendering

// Vertices for defining the rendering of the shape of the Erlenmeyer flask chemical
let ERLENMEYER_FLASK_VERTICES = [
    // bottom
    [0.01, 0.95], [0.5, 1.0], [0.99, 0.95],
    // right edge
    [0.94, 0.7], [0.86, 0.45], [0.66, 0.0],
    // left edge
    [0.28, 0.0], [0.12, 0.45], [0.05, 0.7]
];
// The percentage of the height of the Erlenmeyer flask where chemicals are rendered
let ERLENMEYER_FLASK_HEIGHT_RATIO = 0.64
// The percentage of the height where the Erlenmeyer flash chemicals begin rendering
let ERLENMEYER_FLASK_CHEM_HEIGHT = 0.35;

// X offset for rendering the beaker contents, percentage based on width of beaker
let BEAKER_X_OFFSET = 0.12;
// Y offset for rendering the beaker contents, percentage based on height of beaker
let BEAKER_Y_OFFSET = 0.2;
// The percentage of a beaker's width which is used to render chemicals
let BEAKER_WIDTH_OFFSET = 0.85;
// The percentage of a beaker's height which is used to render chemicals
let BEAKER_HEIGHT_OFFSET = 0.8;

// X offset for rendering the graduated cylinder contents, percentage based on width of cylinder
let GRADUATED_CYLINDER_X_OFFSET = 0.135;
// Y offset for rendering the graduated cylinder contents, percentage based on height of cylinder
let GRADUATED_CYLINDER_Y_OFFSET = 0.1;
// The percentage of a graduated cylinder's width which is used to render chemicals
let GRADUATED_CYLINDER_WIDTH_OFFSET = 0.72;
// The percentage of a graduated cylinder's height which is used to render chemicals
let GRADUATED_CYLINDER_HEIGHT_OFFSET = 0.83;

// X offset for rendering the weigh boat contents, percentage based on width of weigh boat
let WEIGH_BOAT_X_OFFSET = 0.075;
// Y offset for rendering the weigh boat contents, percentage based on height of weigh boat
let WEIGH_BOAT_Y_OFFSET = 0.5;
// The percentage of a graduated cylinder's width which is used to render chemicals
let WEIGH_BOAT_CHEM_WIDTH = 0.85;
// The percentage of a graduated cylinder's height which is used to render chemicals
let WEIGH_BOAT_CHEM_HEIGHT = 3;
// The vertices used to render the shape of the weigh boat's chemicals
let WEIGH_BOAT_VERTICES = [[0, 1], [1, 1], [0.5, 0]];;


// Constants used for key inputs for Experiment

// Keys for panning camera left, right, up, and down
let KEY_EXP_PAN_CAMERA_LEFT;
let KEY_EXP_PAN_CAMERA_RIGHT;
let KEY_EXP_PAN_CAMERA_UP;
let KEY_EXP_PAN_CAMERA_DOWN;

// Key for moving Experiment to next Instruction
let KEY_EXP_NEXT_INSTRUCTION;
// Key for resetting Experiment to default state
let KEY_EXP_RESET;
// Key for displaying Chemical list
let KEY_EXP_DISPLAY_CHEMS;
// Key for displaying Equipment list
let KEY_EXP_DISPLAY_EQUIPS;
// Key for resetting selected Equipment
let KEY_EXP_RESET_SELECTED;

// Keys for adding a set amount of a Chemical to a Container
let KEY_EXP_ADD_CHEM_1 = 49;
let KEY_EXP_ADD_CHEM_5 = 50;
let KEY_EXP_ADD_CHEM_10 = 51;
let KEY_EXP_ADD_CHEM_20 = 52;
let KEY_EXP_ADD_CHEM_25 = 53;

/**
Set up constants to use for key presses in the Experiment
*/
function setUpControlConstants(){
    KEY_EXP_PAN_CAMERA_LEFT = LEFT_ARROW;
    KEY_EXP_PAN_CAMERA_RIGHT = RIGHT_ARROW;
    KEY_EXP_PAN_CAMERA_UP = UP_ARROW;
    KEY_EXP_PAN_CAMERA_DOWN = DOWN_ARROW;

    KEY_EXP_NEXT_INSTRUCTION = 73; // code 73 = i
    KEY_EXP_RESET = 82; // code 83 = r
    KEY_EXP_DISPLAY_CHEMS = 67; // code 67 = c
    KEY_EXP_DISPLAY_EQUIPS = 86; // code 86 = r
    KEY_EXP_RESET_SELECTED = ESCAPE;
}