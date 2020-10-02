/**
The abstract class representing a generic piece of equipment in an Experiment
*/
class Equipment extends ExperimentObject{

    /**
    Create a new Experiment object with the given position, mass, name, and sprite
    position: A list [x, y] of the upper left hand corner coordinates of the Equipment's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this piece of Equipment
    name: As a string, the name given to this specific instance of this piece of Equipment
    sprite: A P5 image file used to display this piece of Equipment
    */
    constructor(position, size, mass, name, sprite){
        super(mass, name);
        this.position = position;
        this.size = size
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
    Set the current size of this piece of Equipment
    pos: The new size, a list [width, height]
    */
    setSize(size){
        this.size = size
    }

    /**
    Set the sprite which will be used to display this piece of Equipment
    sprite: The new sprite, a P5 image file
    */
    setSprite(sprite){
        this.sprite = sprite;
    }

    /**
    Determine if a point is located inside the bounds of this piece of Equipment
    */
    inBounds(pos){
        var cx = pos[0];
        var cy = pos[1];
        var x = this.position[0];
        var y = this.position[1];
        var w = this.size[0];
        var h = this.size[1];
        return x <= cx && cx <= x + w && y <= cy && cy <= y + h;
    }

    /**
    Draw this piece of Equipment onto the screen using P5 2D graphics
    */
    draw(){
        var p = this.position;
        var s = this.size;
        image(this.sprite, p[0], p[1], s[0], s[1]);
    }

}