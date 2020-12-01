var SPRITE_BEAKER;
var SPRITE_ERLENMEYER;
var SPRITE_GRADUATED;
var SPRITE_WEIGH_BOAT;

var SPRITE_TRASH_CAN;
var SPRITE_SCALE;
var SPRITE_STIR_ROD;
var SPRITE_EYE_DROPPER;
var SPRITE_REFRACTOMETER;
var SPRITE_REFRACTOMETER_LENS;

/**
Load in all images for all equipment
*/
function loadImages(){
    SPRITE_BEAKER = loadImage('./simulation/assets/beaker.png');
    SPRITE_ERLENMEYER = loadImage('./simulation/assets/ErlenmeyerFlask.png');
    SPRITE_GRADUATED = loadImage('./simulation/assets/graduatedCylinder.png');
    SPRITE_WEIGH_BOAT = loadImage('./simulation/assets/weighBoat.png');

    SPRITE_TRASH_CAN = loadImage('./simulation/assets/trashcan.png');
    SPRITE_SCALE = loadImage('./simulation/assets/Scale.png');
    SPRITE_STIR_ROD = loadImage('./simulation/assets/stirRod.png');
    SPRITE_EYE_DROPPER = loadImage('./simulation/assets/eyeDropper.png');
    SPRITE_REFRACTOMETER = loadImage('./simulation/assets/refractometer.png');
    SPRITE_REFRACTOMETER_LENS = loadImage('./simulation/assets/refractometerLens.png');
}