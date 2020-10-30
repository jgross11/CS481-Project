/**
A Weight Boat for use in experiments. Primarily for holding solids.
*/
class WeighBoat extends Container{

    /**
    Create a new Weight Boat
    */
    constructor(){
        super([0, 0], [75, 75], 3, 1000, 0.03, SPRITE_WEIGH_BOAT);
    }

    /**
    Get the ID representing a weight boat
    */
    getID(){
        return ID_EQUIP_WEIGH_BOAT;
    }
}


/**
A class for handling controlling a Beaker in a 2D environment
*/
class WeighBoatController2D extends ContainerController2D{
    /**
    Create a new BeakerController to control the given Beaker
    beaker: The Beaker which this Controller will control
    */
    constructor(weighBoat){
        super(weighBoat);
    }

    /**
    Determine if this Controller's WeighBoat can contain the given Chemical.
    Weigh boats can only hold one Chemical type.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        // TODO weigh boats should only be able to weigh solids

        // Check to see that the weigh boat is either empty,
        //  or the chemical to be added is also the same chemical already in the weigh boat
        return this.equipment.isEmpty() || this.equipment.contents[0].properties.getID() === chemical.properties.getID();
    }

    /**
    Draw this Controller's Beaker along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the base weigh boat sprite
        super.draw(graphics);

        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        let chem = eq.contents;
        if(!this.equipment.isEmpty()){
            let chemController = new ChemicalController2D(chem[0]);
            // TODO make render constants
            let w = this.width();
            let h = this.height();
            chemController.drawRect(this.x() + w * 0.1, this.y() + h * 0.1, 1, w * 0.8, h * 0.8, 0, graphics);
        }
    }

}