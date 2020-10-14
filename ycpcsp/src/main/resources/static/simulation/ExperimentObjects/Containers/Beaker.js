/**
A standard Beaker for use in experiments. Primarily for holding liquids, can also hold solids.
*/
class Beaker extends Container{

    /**
    Create a new Beaker object with the given position, mass, capacity, residue, id
    position: A list [x, y] of the upper left hand corner coordinates of the Beaker's location in the Experiment
    size: A list [width, height] of the size of the Equipment in pixels
    mass: A floating point value, the mass, in grams, of this Beaker
    capacity: A floating point value, the maximum amount of contents, in milliliters which this Beaker can hold TODO should this be in milliliters
    residue: A floating point value in range [0-1], the percentage of this Beaker's capacity
        which will be left behind when the contents of this Beaker are poured out.
    */
    constructor(position, size, mass, capacity, residue){
        super(position, size, mass, capacity, residue, SPRITE_BEAKER);
    }

    /**
    Get the ID representing this Beaker
    */
    getID(){
        return ID_EQUIP_BEAKER_TEST;
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
        graphics.text("ID: " + eq.instanceID, this.x() + 25, this.y() + this.height() / 2)
    }

}