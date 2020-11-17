/**
A lens for use specifically with a refractometer
*/
class RefractometerLens extends Container{

    constructor(){
        super([0, 0], [40, 20], 0.1, 0.1, 0, SPRITE_REFRACTOMETER_LENS);
    }

    /**
    Get the ID representing a RefractometerLens
    */
    getID(){
        return ID_EQUIP_REFRACTOMETER_LENS;
    }
}


/**
A class for handling controlling a RefractometerLens in a 2D environment
*/
class RefractometerLensController2D extends ContainerController2D{

    /**
    Create a new RefractometerLensController to control the given lens
    lens: The lens to control
    */
    constructor(lens){
        super(lens);
    }

    /**
    Determine if this Controller's lens can contain the given Chemical.
    The lenses can only hold liquids and solids
    chemical: The Chemical to test if it can be contained
    returns: true if the Chemical can be contained, false otherwise
    */
    canContain(chemical){
        // If the chemical is not a liquid or solid, return false
        if(!(chemical.matterState === MATTER_STATE_LIQUID || chemical.matterState === MATTER_STATE_SOLID)) return false;

        // Check to see the chemical is the same as the one in the lens, or if it is empty
        return this.placeSameChemical(chemical);
    }

    /**
    Draw this Controller's RefractometerLens along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the base RefractometerLens sprite
        super.draw(graphics);

        // Draw the chemicals
        this.drawContentsRect(graphics, REFRACTOMETER_LENS_X_OFFSET, REFRACTOMETER_LENS_Y_OFFSET,
            REFRACTOMETER_LENS_WIDTH_OFFSET, REFRACTOMETER_LENS_HEIGHT_OFFSET);
    }

}
