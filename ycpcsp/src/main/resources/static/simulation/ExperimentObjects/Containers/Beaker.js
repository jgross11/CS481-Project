/**
A standard Beaker for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class Beaker extends Container{

    /**
    Create a new Beaker object based on the given beakerID
    beakerID: The specific ID of a beaker with a specific size
    */
    constructor(beakerID){
        super([0, 0], undefined, undefined, undefined, 0.03, SPRITE_BEAKER);
        this.id = beakerID;
        var newAttributes = null;
        switch(beakerID){
            // All Beaker sizes
            case ID_EQUIP_BEAKER_50mL: newAttributes = [[60, 60], 15.0, 50.0]; break;
            case ID_EQUIP_BEAKER_150mL: newAttributes = [[100, 100], 20.0, 150.0]; break;
            case ID_EQUIP_BEAKER_250mL: newAttributes = [[130, 130], 30.0, 250.0]; break;
            case ID_EQUIP_BEAKER_600mL: newAttributes = [[200, 200], 50.0, 600.0]; break;
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
    constructor(beaker){
        super(beaker);
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
        if(!this.equipment.isEmpty()){
            let w = this.width();
            let h = this.height();
            // TODO make this a method in ContainerController2D
            // TODO make render constants
            drawChemicalRectMultiple(graphics, eq.contents, eq.capacity,
                this.x() + w * .12, this.y() + h * 0.2, w * .85, h * .8);
        }

        // Draw the base Beaker sprite
        super.draw(graphics);
    }

}