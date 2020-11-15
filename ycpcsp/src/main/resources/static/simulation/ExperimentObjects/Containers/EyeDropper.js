/**
An eye dropped used to transfer small amounts of liquid
*/
class EyeDropper extends Container{

    constructor(){
        super([0, 0], [20, 90], 1, 5, 0.1, SPRITE_EYE_DROPPER);
    }

    /**
    Get the ID representing an EyeDropper
    */
    getID(){
        return ID_EQUIP_EYE_DROPPER;
    }
}

/**
A class for handling controlling an EyeDropper in a 2D environment
*/
class EyeDropperController2D extends ContainerController2D{

    /**
    Create a new EyeDropperController to control the given EyeDropper
    eyeDropper: The EyeDropper to control
    */
    constructor(eyeDropper){
        super(eyeDropper);
    }

    // TODO drop method

    /**
    Determine if this Controller's EyeDropper can contain the given Chemical.
    Eye droppers can only hold liquids
    chemical: The Chemical to test if it can be contained
    returns: true if the Chemical can be contained, false otherwise
    */
    canContain(chemical){
        return chemical.matterState === MATTER_STATE_LIQUID;
    }

    /**
    Draw this Controller's EyeDropper along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the chemicals
        this.drawContentsRect(graphics, EYE_DROPPER_X_OFFSET, EYE_DROPPER_Y_OFFSET,
            EYE_DROPPER_WIDTH_OFFSET, EYE_DROPPER_HEIGHT_OFFSET);

        // Draw the base EyeDropper sprite
        super.draw(graphics);
    }

}
