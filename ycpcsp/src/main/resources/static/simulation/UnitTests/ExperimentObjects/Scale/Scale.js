
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
    constructor(){
        super(position, size, mass, capacity, sprite);
        this.heldWeight = 0.0;
        // The weight of  contained by this Container
    }

    /**
     Set the Chemical contents of this Container
     contents: The new contents, a Chemical
     */
    setGivenWeight(heldWeight){
        this.heldWeight = heldWeight;
    }

    /**
     Set the capacity of this Container
     capacity: The new capacity, a floating point value
     */
    setCapacity(capacity){
        this.capacity = capacity;
    }

    /**
     Set the residue of this Container
     capacity: The new residue, a floating point value in range [0-1]
     */
    setResidue(residue){
        this.residue = residue;
    }

    /**
     Set given weigth based on the weight of beaker
     */

    setWeightObj(Beaker){
        if(Beaker.content == null){
            this.heldWeight = Beaker.getMass();
        }
        else{
            this.heldWeight = Beaker.getMass() + Beaker.content.getMass();
        }
    }

    getHeldWeight(){
        return this.heldWeight;
    }
}


