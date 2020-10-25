
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
        super([1,1], [100, 100], 100, SPRITE_SCALE);
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


