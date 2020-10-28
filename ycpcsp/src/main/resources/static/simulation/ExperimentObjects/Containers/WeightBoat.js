/**
A Weight Boat for use in experiments. Primarily for holding liquids, and solids.
*/
class GraduatedCylinder extends Container{

    /**
    Create a new Weight Boat  object based on the given weightID
    weightID: The specific ID of a Weight Boat with a specific size
    */
    constructor(weightID){
        super([0, 0], undefined, undefined, undefined, 0.03, SPRITE_WEIGHTBOAT);
        this.id = weightID;
        var newAttributes = null;
        switch(weightID){
            // All Beaker sizes
            case ID_EQUIP_WEIGHTBOAT: newAttributes = [[45, 25], 15.0, 500.0]; break;
            default: break;
        }
        if(newAttributes !== null){
            this.setSize(newAttributes[0]);
            this.setMass(newAttributes[1]);
            this.setCapacity(newAttributes[2]);
        }
    }

    /**
    Get the ID representing this Beaker
    */
    getID(){
        return this.id;
    }
}


/**
A class for handling controlling a Beaker in a 2D environment
*/
class WeightBoatController2D extends ContainerController2D{
    /**
    Create a new BeakerController to control the given Beaker
    beaker: The Beaker which this Controller will control
    */
    constructor(weightboat){
        super(weightboat);
    }

    /**
    Determine if this Controller's Beaker can contain the given Chemical.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        return true;
    }

    /**
    Draw this Controller's Beaker along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        let chem = eq.contents;
        if(chem !== null){
            let chemController = new ChemicalController2D(chem);
            let w = this.width();
            chemController.drawRect(this.x() + w * .12, this.y(), chem.mass / eq.capacity, w * .85, this.height(), 0.2, graphics);
        }

        // Draw the base Beaker sprite
        super.draw(graphics);

        // Draw the text
        graphics.fill(color(0, 0, 0));
        graphics.noStroke();
        graphics.textSize(15);
        graphics.text("ID: " + eq.instanceID, this.x() + this.width() * 0.4, this.y() + this.height() / 2)
    }

}