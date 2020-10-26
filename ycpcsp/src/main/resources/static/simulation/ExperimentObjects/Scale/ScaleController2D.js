// Constants for identifying which functions have which ids
let ID_FUNC_To_Take_Weight = 1;

class ScaleController2D extends EquipmentController2D{

    constructor(ScaleObject){
        super(ScaleObject);
    }

    /**
     Convert the given id to its corresponding function
     id: The id to convert
     returns: The function of the id
     */
    //TODO ScaleObject(Needs)
    // To either set the object that the scale is weighing or to update the object that the scale is weighing
    setScaleObject(NewObjectTOBeWeighed){
        // Scales only can weigh containers
        if(!(NewObjectTOBeWeighed instanceof ContainerController2D)) return;

        this.equipment.setObjectToBeWeighed(NewObjectTOBeWeighed);
        this.updateWeighingObjectMass();
    }

    idToFunc(id){
        switch(id){
            case ID_FUNC_To_Take_Weight: return this.setScaleObject;
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
            case this.setScaleObject: return ID_FUNC_To_Take_Weight;
            default: return null;
        }
    }

    /**
    Reset this Controller's Scale by resetting the zero value and removing equipment
    */
    reset(){
        this.equipment.setObjectToBeWeighed(null);
        this.equipment.setZeroOut(0);
    }

    /**
    Update the displayed mass of this Container's scale based on the mass of the current object
    */
    updateWeighingObjectMass(){
        let eqControl = this.equipment.ObjectToBeWeighed;
        this.equipment.setDisplayedWeight((eqControl === null) ? 0 : eqControl.equipment.getTotalMass());
    }

    /**
    Get a list of all possible functions which this ScaleController can perform.
    returns: the list of strings
    */
    getFuncDescriptions(){
        return ["Place Equipment"];
    }

    /**
        The zero out function takes the current weight on the scale
        and stores it into the the zeroOut field in the scale object
        After that it substracts the zerout value from the displayed
        Weight
        Example
        Beaker weight 15.00
        zeroOut()
        zeroout value in the scale object becomes 15.00
        displayed weight which is equal to displayedWeight = Equipment.totalWeight - ZeroutValue
        so becomes displayedWeight = 15.00 - 15.00 = 0
    */
    zeroOut(){
        this.equipment.ZeroOut = ScaleObject.getHeldWeight();
    }

    clearZeroOut(){
        this.equipment.ZeroOut = 0.0;
    }

    /**
    Find the mass of the ContainerController2D and update the scale's mass display
    */
    update(){
        this.updateWeighingObjectMass();
        // TODO find a way to set the Scale to be holding nothing when the user moves the Scale's Container
    }

    /**
    Draw this Controller's Scale onto the screen using P5 2D graphics
    graphics: The P5 graphics to use
    */
    draw(graphics){
        super.draw(graphics);

        // Draw the mass on the scale
        graphics.noStroke();
        graphics.fill(0);
        graphics.textSize(15);
        graphics.text("" + this.equipment.DisplayedWeight, this.x() + this.width() * 0.2, this.y() + this.height() * 0.7);
    }

}