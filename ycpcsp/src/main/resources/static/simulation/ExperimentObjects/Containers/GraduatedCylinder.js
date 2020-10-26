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
            case ID_EQUIP_GRADUATED_25mL: newAttributes = [[60, 60], 15.0, 25.0]; break;
            case ID_EQUIP_GRADUATED_50mL: newAttributes = [[100, 100], 20.0, 50.0]; break;
            case ID_EQUIP_GRADUATED_100mL: newAttributes = [[130, 130], 30.0, 100.0]; break;
            case ID_EQUIP_GRADUATED_1000mL: newAttributes = [[200, 200], 50.0, 1000.0]; break;
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
class CylinderController2D extends ContainerController2D{
    /**
    Create a new CylinderController to control the given Graduated Cylinder
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
        if(eq.contents.length > 0){
            let chem = eq.contents[0];
            let chemController = new ChemicalController2D(chem);
            let w = this.width();
            chemController.drawRect(this.x() + w * .12, this.y(), chem.mass / eq.capacity, w * .85, this.height(), 0.2, graphics);
        }

        // Draw the base Cylinder sprite
        super.draw(graphics);

        // Draw the text
        graphics.fill(color(0, 0, 0));
        graphics.noStroke();
        graphics.textSize(15);
        graphics.text("ID: " + eq.instanceID, this.x() + this.width() * 0.4, this.y() + this.height() / 2)
    }

}