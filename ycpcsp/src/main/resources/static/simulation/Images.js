var SPRITE_BEAKER;
var SPRITE_ERLENMEYER;
var SPRITE_GRADUATED;
var SPRITE_WEIGH_BOAT;

var SPRITE_TRASH_CAN;
var SPRITE_SCALE;

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
}