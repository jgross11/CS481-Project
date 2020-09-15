/**
A standard beaker for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class Beaker extends Container{

    /**
    Create a new Beaker object with the given position, mass, capacity, residue, name
    position: A list [x, y] of the coordinates of the Beaker's location in the Experiment
    mass: A floating point value, the mass, in grams, of this Beaker
    capacity: A floating point value, the maximum amount of contents, in milliliters which this Beaker can hold TODO should this be in milliliters
    residue: A floating point value in range [0-1], the percentage of this Beaker's capacity
        which will be left behind when the contents of this Beaker are poured out.
    name: As a string, the name given to this specific instance of this Beaker
    */
    constructor(position, mass, capacity, residue, name){
        super(position, mass, capacity, residue, name, BEAKER);
    }

    canContain(chemical){
        return true;
    }

}