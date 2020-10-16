// Constants for the P5 canvas

// The width of the canvas being displayed
let CANVAS_WIDTH = 1280;
// The height of the canvas being displayed
let CANVAS_HEIGHT = 800;


// A rectangular bounds of the space in the canvas which can be rendered, [x, y, width, height]
let EXP_BOUNDS = [0, 100, CANVAS_WIDTH, CANVAS_HEIGHT - 200];

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