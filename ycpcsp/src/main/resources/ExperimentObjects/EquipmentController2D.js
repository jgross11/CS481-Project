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
    Determine if a point is located inside the bounds of this piece of Equipment
    */
    inBounds(pos){
        var cx = pos[0];
        var cy = pos[1];
        var eq = this.equipment;
        var x = eq.position[0];
        var y = eq.position[1];
        var w = eq.size[0];
        var h = eq.size[1];
        return x <= cx && cx <= x + w && y <= cy && cy <= y + h;
    }

    /**
    Draw this piece of Equipment onto the screen in it's current position as a generic sprite
    */
    drawSprite(){
        var p = this.equipment.position;
        var s = this.equipment.size;
        image(this.equipment.sprite, p[0], p[1], s[0], s[1]);
    }

    /**
    Draw this piece of Equipment onto the screen using P5 2D graphics
    */
    draw(){
        this.drawSprite();
    }
}