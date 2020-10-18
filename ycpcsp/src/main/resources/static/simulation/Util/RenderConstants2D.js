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
let EXP_BACKGROUND_COLOR = 230;

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
let EXP_EQUIP_SELECT_STROKE_COLOR = [150, 150, 255, 160];
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