/**
A class for handling controlling a piece of Equipment in a 2D environment
*/
class EquipmentController2D extends ExperimentObjectController2D{

    /**
    Create a new EquipmentController to control the given piece of Equipment
    equipment: The piece of Equipment which this Controller will control
    */
    constructor(equipment){
        super();
        this.equipment = equipment;
    }

    /**
    Set the currently used Equipment for this EquipmentController
    equipment: The piece of Equipment which will be controlled by this Controller
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }

    /**
    Get the piece of Equipment controlled by this Controller
    */
    getObject(){
        return this.equipment;
    }

    /**
    Get the x coordinate of the Equipment of this Controller
    */
    x(){
        return this.equipment.position[0];
    }

    /**
    Get the y coordinate of the Equipment of this Controller
    */
    y(){
        return this.equipment.position[1];
    }

    /**
    Get the width of the Equipment of this Controller
    */
    width(){
        return this.equipment.size[0];
    }

    /**
    Get the height of the Equipment of this Controller
    */
    height(){
        return this.equipment.size[1];
    }

    /**
    Get the rectangular bounds of this Controller's Equipment as a rectangle
    returns: the bounds as a list of 4 floating point values [x, y, width, height],
        x and y are the upper left hand corner
    */
    toRect(){
        return [this.x(), this.y(), this.width(), this.height()];
    }

    /**
    Determine if a point is located inside the bounds of this Controller's Equipment
    pos: The point to test
    returns: true if the point is inside the Equipment, false otherwise
    */
    inBounds(pos){
        return pointInRect2D(this.toRect(), pos);
    }

    /**
    Draw this Controller's Equipment onto the screen in it's current position as a generic sprite
    */
    drawSprite(){
        var r = this.toRect();
        image(this.equipment.sprite, r[0], r[1], r[2], r[3]);
    }

    /**
    Draw this Controller's Equipment onto the screen using P5 2D graphics
    */
    draw(){
        this.drawSprite();
    }
}