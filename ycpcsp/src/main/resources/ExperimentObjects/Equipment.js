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
    Set the current position of this piece of Equipment
    pos: The new position, a list [x, y] of coordinates
    */
    setPosition(pos){
        this.position = pos
    }

    /**
    Set the sprite which will be used to display this piece of Equipment
    sprite: The new sprite, a P5 image file
    */
    setSprite(sprite){
        this.sprite = sprite;
    }

}