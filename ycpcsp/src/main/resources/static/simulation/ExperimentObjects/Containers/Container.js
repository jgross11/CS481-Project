/**
The abstract class representing a generic Container in an Experiment
*/
class Container extends Equipment{

    /**
    Create a new, empty, Container object with the given position, mass, capacity, residue, id, and sprite
    position: A list [x, y] of the upper left hand corner coordinates of the Container's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this Container
    capacity: A floating point value, the maximum amount of contents which this Container can hold
    residue: A floating point value in range [0-1], the percentage of this Container's capacity
        which will be left behind when the contents of this Container are poured out.
    sprite: A P5 image file used to display this piece of Container
    */
    constructor(position, size, mass, capacity, residue, sprite){
        super(position, size, mass, sprite);
        this.capacity = capacity;
        this.residue = residue;

        // The Chemical contained by this Container
        this.contents = null;
    }

    /**
    Set the Chemical contents of this Container
    contents: The new contents, a Chemical
    */
    setContents(contents){
        this.contents = contents;
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