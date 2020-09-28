/**
A standard beaker for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class Beaker extends Container{

    /**
    Create a new Beaker object with the given position, mass, capacity, residue, name
    position: A list [x, y] of the upper left hand corner coordinates of the Beaker's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this Beaker
    capacity: A floating point value, the maximum amount of contents, in milliliters which this Beaker can hold TODO should this be in milliliters
    residue: A floating point value in range [0-1], the percentage of this Beaker's capacity
        which will be left behind when the contents of this Beaker are poured out.
    instanceID: A unique integer specifying this Beaker
    */
    constructor(position, size, mass, capacity, residue, instanceID){
        super(position, size, mass, capacity, residue, instanceID, SPRITE_BEAKER);
    }

}