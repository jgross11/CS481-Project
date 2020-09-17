/**
The abstract class representing a generic container in an Experiment
*/
class Container extends Equipment{

    /**
    Create a new Container object with the given position, mass, capacity, residue, name, and sprite
    position: A list [x, y] of the coordinates of the Container's location in the Experiment
    mass: A floating point value, the mass, in grams, of this Container
    capacity: A floating point value, the maximum amount of contents which this Container can hold
    residue: A floating point value in range [0-1], the percentage of this Container's capacity
        which will be left behind when the contents of this Container are poured out.
    name: As a string, the name given to this specific instance of this Container
    sprite: A P5 image file used to display this piece of Container
    */
    constructor(position, mass, capacity, residue, name, sprite){
        super(position, mass, name, sprite);
        this.capacity = capacity;
        this.residue = residue;
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


}