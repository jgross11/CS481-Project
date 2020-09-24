/**
A class for handling controlling a Beaker in a 2D environment
*/
class BeakerController2D extends ContainerController2D{
    /**
    Create a new BeakerController to control the given Beaker
    beaker: The Beaker which this controller will control
    */
    constructor(beaker){
        super(beaker);
    }

    /**
    Determine if the Beaker of this Controller can contain the given chemical.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        return true;
    }

    /**
    Draw the beaker along with its name
    */
    draw(){
        // Draw the base beaker
        super.draw();

        // Draw the name
        fill(color(0, 0, 0));
        noStroke();
        textSize(15);
        text(this.equipment.name, this.x() + 25, this.y() + this.height() / 2)
    }

}