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
    Draw this piece of Equipment onto the screen using P5 2D graphics
    */
    draw(){
        p = this.equipment.position;
        image(this.equipment.sprite, p[0], p[1]);
    }

}