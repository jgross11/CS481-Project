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

    /**
    By hand, pour out the contents of this Container. This will leave residue inside the container
    */
    pourOut(){
        // TODO implement
    }

    /**
    Add the given chemical to this container. Does nothing if the chemical cannot be placed in this container.
    chemical: The chemical to be placed in this container
    returns: true if the chemical was successfully added, false otherwise
    */
    addTo(chemical){
        if(this.canContain(chemical)){
            // TODO implement add chemical
            return true;
        }
        return false;

    }

    /**
    Determine if this container can hold the given chemical.
    chemical: The Chemical which should be tested
    returns: true if the container can hold the chemical, false otherwise
    */
    canContain(chemical){
        throw new Error("All Container objects must implement canContain(chemical)");
    }


}