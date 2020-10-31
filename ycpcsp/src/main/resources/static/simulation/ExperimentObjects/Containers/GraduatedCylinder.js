/**
A standard Graduated Cylinder for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class GraduatedCylinder extends Container{

    /**
    Create a new Graduated Cylinder object based on the given graduatedID
    graduatedID: The specific ID of a Graduated Cylinder with a specific size
    */
    constructor(graduatedID){
        super([0, 0], undefined, undefined, undefined, 0.03, SPRITE_GRADUATED);
        this.id = graduatedID;
        var newAttributes = null;
        switch(graduatedID){
            // All Beaker sizes
            case ID_EQUIP_GRADUATED_25mL: newAttributes = [[23, 80], 15.0, 25.0]; break;
            case ID_EQUIP_GRADUATED_50mL: newAttributes = [[32.4, 112], 20.0, 50.0]; break;
            case ID_EQUIP_GRADUATED_100mL: newAttributes = [[39.1, 136], 30.0, 100.0]; break;
            case ID_EQUIP_GRADUATED_1000mL: newAttributes = [[57.5, 200], 50.0, 1000.0]; break;
            default: break;
        }
        if(newAttributes !== null){
            this.setSize(newAttributes[0]);
            this.setMass(newAttributes[1]);
            this.setCapacity(newAttributes[2]);
        }
    }

    /**
    Get the ID representing this Graduated Cylinder
    */
    getID(){
        return this.id;
    }
}


/**
A class for handling controlling a Graduated Cylinder in a 2D environment
*/
class GraduatedCylinderController2D extends ContainerController2D{
    /**
    Create a new GraduatedCylinderController to control the given Graduated Cylinder
    graduated: The Cylinder which this Controller will control
    */
    constructor(graduated){
        super(graduated);
    }

    /**
    Determine if this Controller's Cylinder can contain the given Chemical.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        return true;
    }

    /**
    Draw this Controller's Cylinder along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        if(!this.equipment.isEmpty()){
            let chem = eq.contents[0];
            let chemController = new ChemicalController2D(chem);
            let w = this.width();
            chemController.drawRect(this.x() + w * .135, this.y(), eq.getTotalContentsMass() / eq.capacity, w * .72, this.height() * 0.93, 0.1, graphics);
        }

        // Draw the base Cylinder sprite
        super.draw(graphics);
    }

}