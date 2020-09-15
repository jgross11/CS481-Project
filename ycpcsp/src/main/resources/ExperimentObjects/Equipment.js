/**
The abstract class representing a generic piece of equipment in an Experiment
*/
class Equipment extends ExperimentObject{

    /**
    Create a new Experiment object with the given position, mass, name, and sprite
    position: A list [x, y] of the coordinates of the Equipment's location in the Experiment
    mass: A floating point value, the mass, in grams, of this piece of Equipment
    name: As a string, the name given to this specific instance of this piece of Equipment
    sprite: A P5 image file used to display this piece of Equipment
    */
    constructor(position, mass, name, sprite){
        super(mass, name);
        this.position = position;
        this.sprite = sprite;
    }

    /**
    Draw this piece of Equipment onto the screen using P5 2D graphics
    TODO abstract this out to account for 2D and 3D graphics
    */
    draw() {
        image(this.sprite, this.position[0], this.position[1]);
    }


}