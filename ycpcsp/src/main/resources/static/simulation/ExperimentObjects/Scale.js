/**
A scale used to weigh containers
*/
class Scale extends Equipment{

    /**
     Create a new, empty, SCale object with the given position, mass, capacity, residue, id, and sprite
     position: A list [x, y] of the upper left hand corner coordinates of the scale's location in the Experiment
     size: A list [width, height] of the size of the Equipment in pixels
     mass: A floating point value, the mass, in grams, of this Container
     capacity: A floating point value, the maximum amount of Weight  which this Scale can hold
     residue: A floating point value in range [0-1], the percentage of this Container's capacity
     which will be left behind when the object that this container holds are removed from it.
     sprite: A P5 image file used to display this piece of Container
     */
    constructor(ObjectToBeWeighed = null){
        super([1,1], [120, 60], 100, SPRITE_SCALE);
        this.DisplayedWeight = 0.0;
        this.ObjectToBeWeighed = ObjectToBeWeighed;
        this.ZeroOut = 0.0;
        // The weight of  contained by this Container
    }

    /**
    Set the current position of this Scale, also updates the position of the held object
    pos: The new position, a list [x, y] of coordinates
    */
    setPosition(pos){
        super.setPosition(pos);
        // Update the position of the equipment
        let obj = this.ObjectToBeWeighed;
        if(obj !== null){
            let scaleControl = new ScaleController2D(this);
            let eq = obj.equipment;
            eq.setPosition([scaleControl.getCenter()[0] - eq.size[0] * 0.5, pos[1] - eq.size[1]]);
        }
    }

    setDisplayedWeight(displayedWeight){
        this.DisplayedWeight = displayedWeight;
    }

    setObjectToBeWeighed(NewObjectToBeWeighed){
        this.ObjectToBeWeighed = NewObjectToBeWeighed;
        // Update the position of this Scale, and the position of the object to be weighed
        this.setPosition(this.position);
    }

    getID() {
        return ID_EQUIP_SCALE;
    }

    setZeroOut(value){
        this.ZeroOut = value;
    }

    getZeroOut(){
        return this.ZeroOut;
    }

    /**
     Set given weigth based on the weight of Equipment
     */

    getWeightObj(){
            this.DisplayedWeight = this.ObjectToBeWeighed.getTotalMass() - this.zeroOut;
    }


    // TODO Zero out
    getHeldWeight(){
        return this.DisplayedWeight;
    }
}


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
        graphics.text("" + this.equipment.DisplayedWeight, this.x() + this.width() * 0.3, this.y() + this.height() * 0.7);
    }

}