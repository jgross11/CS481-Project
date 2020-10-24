/**
A standard Erlenmeyer for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class ErlenmeyerFlask extends Container{

    /**
    Create a new Erlenmeyer Beaker object based on the given erlenmeyerID
    erlenmeyerID: The specific ID of a erlenmeyer Beaker with a specific size
    */
    constructor(erlenmeyerID){
        super([0, 0], undefined, undefined, undefined, 0.03, SPRITE_ERLENMEYER);
        this.id = erlenmeyerID;
        var newAttributes = null;
        switch(erlenmeyerID){
            // All Beaker sizes
            case ID_EQUIP_FLASK_25mL: newAttributes = [[60, 60], 15.0, 25.0]; break;
            case ID_EQUIP_FLASK_50mL: newAttributes = [[100, 100], 20.0, 50.0]; break;
            case ID_EQUIP_FLASK_100mL: newAttributes = [[130, 130], 30.0, 100.0]; break;
            case ID_EQUIP_FLASK_1000mL: newAttributes = [[200, 200], 50.0, 1000.0]; break;
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
class BeakerController2D extends ContainerController2D{
    /**
    Create a new BeakerController to control the given Beaker
    beaker: The Beaker which this Controller will control
    */
    constructor(erlenmeyer){
        super(erlenmeyer);
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