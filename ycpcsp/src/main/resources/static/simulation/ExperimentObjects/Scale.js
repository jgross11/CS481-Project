/**
A Scale used to weigh containers
*/
class Scale extends Equipment{

    /**
     Create a new, empty, Scale object holding the given object
     objectToBeWeighed: The object which will be placed on the scale, default null
     */
    constructor(objectToBeWeighed = null){
        super([0, 0], [120, 60], 100, SPRITE_SCALE);
        this.setDisplayedWeight(0.0);
        this.setObjectToBeWeighed(objectToBeWeighed);
        this.setZeroOut(0.0);

        // The listener used to update the object on this scale
        this.weighingObjectPosListener = null;
    }

    /**
    Set the current position of this Scale, also updates the position of the held object
    pos: The new position, a list [x, y] of coordinates
    */
    setPosition(pos){
        super.setPosition(pos);
        this.updateHeldPosition();
    }

    /**
    If this Scale holds an object, update its position so that it is on top of the scale
    */
    updateHeldPosition(){
        let obj = this.objectToBeWeighed;
        if(obj !== null){
            let scaleControl = new ScaleController2D(this);
            let eq = obj.equipment;
            let pos = this.position;
            eq.setPosition([scaleControl.getCenter()[0] - eq.size[0] * 0.5, pos[1] - eq.size[1]]);
        }
    }

    /**
    Set the weight displayed on this scale
    displayedWeight: The weight
    */
    setDisplayedWeight(displayedWeight){
        this.displayedWeight = displayedWeight;
    }

    /**
    Set the object which this scale is currently weighing
    */
    setObjectToBeWeighed(objectToBeWeighed){
        this.objectToBeWeighed = objectToBeWeighed;
        // Update the position of the object to be weighed
        this.updateHeldPosition();
    }

    /**
    Set the value to which this scale has been zeroed out
    */
    setZeroOut(zeroOut){
        this.zeroOut = zeroOut;
    }

    /**
    Get the mass of the scale as zeroed out
    returns: The mass
    */
    getZeroedWeight(){
        let obj = this.objectToBeWeighed;
        let m = (obj === null || obj === undefined) ? 0 : obj.equipment.getTotalMass();
        return m - this.zeroOut;
    }

    /**
    Get the ID of the Scale object
    */
    getID(){
        return ID_EQUIP_SCALE;
    }
}


// Constants for identifying which functions have which ids
let ID_FUNC_SCALE_TO_TAKE_WEIGHT = 1;
let ID_FUNC_SCALE_REMOVE_OBJECT = 2;
let ID_FUNC_SCALE_ZERO_OUT = 3;
let ID_FUNC_SCALE_CLEAR_ZERO = 4;

/**
An object used to control Scales
*/
class ScaleController2D extends EquipmentController2D{

    /**
    Create a ScaleController with the given Scale
    */
    constructor(scaleObject){
        super(scaleObject);
    }

    /**
    Set the object held by this ScaleController2D. Scales can only hold ContainerController2D objects
    objectToBeWeighed: The object to eight
    */
    setScaleObject(objectToBeWeighed){
        // Scales only can weigh containers
        if(!(objectToBeWeighed instanceof ContainerController2D)) return;

        // If there is already an object on the scale, first remove it
        if(this.equipment.objectToBeWeighed !== null) this.removeScaleObject();

        // Set the actual Container and update the scale's displayed mass
        this.equipment.setObjectToBeWeighed(objectToBeWeighed);
        this.updateWeighingObjectMass();

        // Set up a listener for the equipment
        let eq = this.equipment;
        eq.weighingObjectPosListener = new Listener(this, function(obj){
            let held = obj.equipment.objectToBeWeighed.equipment;

            // Do nothing if the object is still close enough to the scale on the y axis
            if(Math.abs(held.position[1] + held.size[1] - obj.y()) < 0.1) return;

            let oldPos = held.position;
            obj.removeScaleObject();
            held.setPosition(oldPos);
        });
        eq.objectToBeWeighed.equipment.addPositionListener(eq.weighingObjectPosListener);
    }

    /**
    Take the object on this Controller's Scale off of the Scale
    */
    removeScaleObject(){
        // Remove the listener from the equipment
        let eq = this.equipment;
        let weigh = eq.objectToBeWeighed;
        if(weigh === null) return;
        weigh.equipment.removePositionListener(eq.weighingObjectPosListener);

        let center = this.getCenter();
        weigh.setCenter(center[0] - weigh.width() - this.width(), center[1]);
        weigh.keepInBounds(EXP_CAMERA_OUTLINE_BOUNDS);
        this.equipment.setObjectToBeWeighed(null);
        this.updateWeighingObjectMass();
    }

    /**
     Convert the given id to its corresponding function
     id: The id to convert
     returns: The function of the id
     */
    idToFunc(id){
        switch(id){
            case ID_FUNC_SCALE_TO_TAKE_WEIGHT: return this.setScaleObject;
            case ID_FUNC_SCALE_REMOVE_OBJECT: return this.removeScaleObject;
            case ID_FUNC_SCALE_ZERO_OUT: return this.zeroOut;
            case ID_FUNC_SCALE_CLEAR_ZERO: return this.clearZeroOut;
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
            case this.setScaleObject: return ID_FUNC_SCALE_TO_TAKE_WEIGHT;
            case this.removeScaleObject: return ID_FUNC_SCALE_REMOVE_OBJECT;
            case this.zeroOut: return ID_FUNC_SCALE_ZERO_OUT;
            case this.clearZeroOut: return ID_FUNC_SCALE_CLEAR_ZERO;
            default: return null;
        }
    }

    /**
    Reset this Controller's Scale by resetting the zero value and removing equipment
    */
    reset(){
        this.removeScaleObject();
        this.clearZeroOut();
    }

    /**
    Update the displayed mass of this Container's scale based on the mass of the current object
    */
    updateWeighingObjectMass(){
        let eq = this.equipment;
        eq.setDisplayedWeight(eq.getZeroedWeight());
    }

    /**
    Get a list of all possible functions which this ScaleController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Place Container", "Remove Container", "Zero Out", "Clear Zero"];
    }

    /**
        The zero out function takes the current weight on the scale
        and stores it into the the zeroOut field in the scale object
        After that it subtracts the zero out value from the displayed
        Weight
        Example
        Beaker weight 15.00
        zeroOut()
        zero out value in the scale object becomes 15.00
        displayed weight which is equal to displayedWeight = Equipment.totalWeight - ZeroutValue
        so becomes displayedWeight = 15.00 - 15.00 = 0
    */
    zeroOut(){
        let eq = this.equipment;
        let obj = eq.objectToBeWeighed;
        if(obj === null) return;
        eq.setZeroOut(obj.equipment.getTotalMass());
    }

    /**
    Reset the zeroed out value of this Controller's Scale to default
    */
    clearZeroOut(){
        this.equipment.setZeroOut(0.0);
    }

    /**
    Find the mass of the ContainerController2D and update the scale's mass display
    */
    update(){
        this.updateWeighingObjectMass();
    }

    /**
    Draw this Controller's Scale onto the screen using P5 2D graphics
    graphics: The P5 graphics to use
    */
    draw(graphics){
        super.draw(graphics);

        // Draw the mass on the scale
        graphics.noStroke();
        graphics.fill(SCALE_TEXT_COLOR);
        graphics.textSize(SCALE_TEXT_SIZE);

        let eq = this.equipment;
        let hOff = this.height() * SCALE_MASS_TEXT_Y_OFFSET;
        graphics.text("" + eq.displayedWeight.toFixed(SCALE_MASS_TEXT_DECIMAL_PLACES),
            this.x() + this.width() * SCALE_MASS_TEXT_X_OFFSET, this.y() + hOff);

        // Indicate if the scale is zeroed out
        if(eq.zeroOut !== 0){
            graphics.text("Z", this.x() + this.width() * SCALE_ZEROED_TEXT_X_OFFSET, this.y() + hOff);
        }
    }

}