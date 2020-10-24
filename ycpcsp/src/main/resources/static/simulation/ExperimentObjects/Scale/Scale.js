
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
    constructor(Scaleobject = null){
        super(position, size, mass,  sprite);
        this.scaleId = 5;
        this.DisplayedWeight = 0.0;
        this.ScaleObject = Scaleobject;
        this.ZeroOut = 0.0;
        // The weight of  contained by this Container
    }

    getID() {
        return this.scaleId;
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
            this.DisplayedWeight = this.ScaleObject.getTotalMass() - this.zeroOut;
    }


    // TODO Zero out
    getHeldWeight(){
        return this.DisplayedWeight;
    }
}


