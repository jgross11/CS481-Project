/**
A Weight Boat for use in experiments. Primarily for holding solids.
*/
class WeighBoat extends Container{

    /**
    Create a new Weight Boat
    */
    constructor(){
        super([0, 0], [88, 14.3], 1, 2, 0, SPRITE_WEIGH_BOAT);
    }

    /**
    Get the ID representing a weight boat
    */
    getID(){
        return ID_EQUIP_WEIGH_BOAT;
    }
}


/**
A class for handling controlling a WeighBoat in a 2D environment
*/
class WeighBoatController2D extends ContainerController2D{
    /**
    Create a new WeighBoat to control the given WeighBoat
    weighBoat: The WeighBoat which this Controller will control
    */
    constructor(weighBoat){
        super(weighBoat);
        this.chemFill = createGraphics(this.width() * WEIGH_BOAT_CHEM_WIDTH, this.height() * WEIGH_BOAT_CHEM_HEIGHT);
    }

    /**
    Determine if this Controller's WeighBoat can contain the given Chemical.
    Weigh boats can only hold one Chemical type.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        let eq = this.equipment;

        // If chemical is not a solid, it cannot be added
        if(chemical.matterState !== MATTER_STATE_SOLID) return false;

        // Check to see the chemical is the same as the one in the WeighBoat, or if it is empty
        return this.placeSameChemical(chemical);
    }

    /**
    Draw this Controller's WeighBoat along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the base weigh boat sprite
        super.draw(graphics);

        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        let chem = eq.contents;
        if(!eq.isEmpty()){
            let chemController = new ChemicalController2D(chem[0]);
            let w = this.width();
            let h = this.height();
            let xOff = w * WEIGH_BOAT_X_OFFSET;
            let yOff = h * WEIGH_BOAT_Y_OFFSET;
            drawChemicalShapeMultiple(graphics, eq.contents, eq.capacity, WEIGH_BOAT_VERTICES,
                this.x() + xOff, this.y() + yOff - h * WEIGH_BOAT_CHEM_HEIGHT, this.chemFill);
        }
    }

    /**
    Determine if any part of this Controller's WeighBoat, including its contents, when rendered, will appear in the given bounds
    bounds: The bounds to use, a rectangle [far left x, upper y, width, height]
    returns: true if This Controller's WeighBoat will be rendered, false otherwise
    */
    shouldRender(bounds){
        let b = this.toRect();
        let y = this.y();
        let h = this.height();
        let hC = h * WEIGH_BOAT_CHEM_HEIGHT;
        let hOff = h * WEIGH_BOAT_Y_OFFSET;
        b[1] = y + hOff - hC;
        b[3] = hOff + hC;
        return rectInRect2D(bounds, b);
    }

}