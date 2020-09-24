/**
A class for handling controlling a piece of Equipment in a 2D environment
*/
class EquipmentController2D{

    /**
    Create a new EquipmentController to control the given piece of Equipment
    equipment: The piece of Equipment which this controller will control
    */
    constructor(equipment){
        this.equipment = equipment;
    }

    /**
    Set the currently used Equipment for this EquipmentController
    */
    setEquipment(equipment){
        this.equipment = equipment;
    }

    /**
    Get the x coordinate of the Equipment of this controller
    */
    x(){
        return this.equipment.position[0];
    }

    /**
    Get the y coordinate of the Equipment of this controller
    */
    y(){
        return this.equipment.position[1];
    }

    /**
    Get the width of the Equipment of this controller
    */
    width(){
        return this.equipment.size[0];
    }

    /**
    Get the height of the Equipment of this controller
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
    Determine if a point is located inside the bounds of this piece of Equipment
    pos: The point to test
    returns: true if the point is inside this equipment, false otherwise
    */
    inBounds(pos){
        return pointInRect2D(this.toRect(), pos);
    }

    /**
    Draw this piece of Equipment onto the screen in it's current position as a generic sprite
    */
    drawSprite(){
        var r = this.toRect();
        image(this.equipment.sprite, r[0], r[1], r[2], r[3]);
    }

    /**
    Draw this piece of Equipment onto the screen using P5 2D graphics
    */
    draw(){
        this.drawSprite();
    }
}