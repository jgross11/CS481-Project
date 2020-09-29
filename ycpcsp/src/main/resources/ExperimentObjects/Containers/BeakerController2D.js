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
    Determine if the Beaker of this Controller can contain the given Chemical.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        return true;
    }

    /**
    Draw the Beaker along with its name
    */
    draw(){
        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        let chem = eq.contents;
        if(chem !== null){
            let chemController = new ChemicalController2D(chem);
            let w = this.width();
            chemController.drawRect(this.x() + w * .12, this.y(), chem.mass / eq.capacity, w * .85, this.height(), 0.2);
        }

        // Draw the base Beaker sprite
        super.draw();

        // Draw the text
        fill(color(0, 0, 0));
        noStroke();
        textSize(15);
        text("Beaker, ID: " + eq.instanceID, this.x() + 25, this.y() + this.height() / 2)
        var mass = "mass: "
        mass += (eq.contents === null) ? 0 : eq.contents.mass.toFixed(2);
        mass += " / " + eq.capacity;
        text(mass, this.x() + 25, this.y() + this.height() / 2 + 18)
    }

}