/**
A class handling the model of a Refractometer
*/
class Refractometer extends Equipment{

    /**
    Create a new Refractometer using the given lens.
    lensControl: The RefractometerLensController2D to give to this Refractometer, or null to not use a lens, default null
    */
    constructor(lensControl = null){
        super([0, 0], [120, 36], 2, SPRITE_REFRACTOMETER);
        this.lensControl = lensControl;
    }

    /**
    Set the lens of this Refractometer
    lensControl: The RefractometerLensController2D to give to this Refractometer, or null to not use a lens, default null
    */
    setLens(lensControl){
        this.lensControl = lensControl;
    }

    /**
    Get the ID of the Refractometer object
    */
    getID(){
        return ID_EQUIP_REFRACTOMETER;
    }

    /**
    Set the current position of this Refractometer
    pos: The new position, a list [x, y] of coordinates
    bounds: The bounds to keep the position inside of, or null to ignore, default null
    */
    setPosition(pos, bounds = null){
        super.setPosition(pos, bounds);
        this.updateLensPosition();
    }

    /**
    Set the position of the lens of this Refractometer to be relative to it.
    Does nothing if there is no lens
    returns: true if the position was updated, false otherwise
    */
    updateLensPosition(){
        let lensC = this.lensControl;
        if(lensC === null) return false;
        let lens = lensC.equipment;
        if(lens === null) return false;
        lens.setPosition([this.position[0], this.position[1] + (this.size[1] - lensC.height()) * 0.5]);
        return true;
    }

}

let ID_FUNC_REFRACTOMETER_SET_LENS = 1;
let ID_FUNC_REFRACTOMETER_REMOVE_LENS = 2;

/**
A class which controls a Refractometer
*/
class RefractometerController2D extends EquipmentController2D{

    /**
    Create a new RefractometerController with the given refractometer
    refractometer: The Refractometer for this Controller to control
    */
    constructor(refractometer){
        super(refractometer);
    }

    /**
     Convert the given id to its corresponding function
     id: The id to convert
     returns: The function of the id
     */
    idToFunc(id){
        switch(id){
            case ID_FUNC_REFRACTOMETER_SET_LENS: return this.setLens;
            case ID_FUNC_REFRACTOMETER_REMOVE_LENS: return this.removeLens;
            default: return null;
        }
    }

    /**
     Convert the given function to its corresponding id
     func: The function to convert
     returns: The id of the function
     */
    funcToId(func){
        switch(func){
            case this.setLens: return ID_FUNC_REFRACTOMETER_SET_LENS;
            case this.removeLens: return ID_FUNC_REFRACTOMETER_REMOVE_LENS;
            default: return null;
        }
    }

    /**
    Reset this Controller's Scale by resetting the zero value and removing equipment
    */
    reset(){
        this.removeLens();
    }

    /**
    Get a list of all possible functions which this RefractometerController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Place Lens", "Remove Lens"];
    }

    /**
    Set the lens which this Controller uses
    lensControl: The RefractometerLensController to set, or null to remove it
    */
    setLens(lensControl){
        if(!(lensControl instanceof RefractometerLensController2D)) return;

        let eq = this.equipment;
        eq.setLens(lensControl);
        eq.updateLensPosition();
    }

    /**
    Remove the lens of this Controller's Refractometer
    */
    removeLens(){
        let eq = this.equipment;
        let lens = this.equipment.lensControl;
        // Properly remove the lens
        this.setLens(null);

        // Position the lens off of the refractometer, if one was removed
        if(lens !== null){
            lens.equipment.setPosition([this.x() - lens.width() - 10, this.y()], EXP_CAMERA_OUTLINE_BOUNDS);
        }
    }

    /**
    Draw this Controller's Refractometer along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the base Refractometer sprite
        super.draw(graphics);

        // Draw the density
        let lensC = this.equipment.lensControl;
        if(lensC === null) return;
        let lens = lensC.equipment;
        if(lens === null) return;
        let conts = lens.contents[0];
        if(conts !== undefined && conts !== null){
            graphics.textSize(REFRACTOMETER_TEXT_SIZE);
            graphics.fill(REFRACTOMETER_TEXT_COLOR);
            graphics.noStroke();
            // TODO make render constant
            graphics.text(conts.getDensity().toFixed(3),
                this.x() + this.width() * REFRACTOMETER_TEXT_X_OFFSET,
                this.y() + this.height() * REFRACTOMETER_TEXT_Y_OFFSET);
        }
    }

}