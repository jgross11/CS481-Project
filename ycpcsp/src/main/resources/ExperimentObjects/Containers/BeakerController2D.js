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
        // Draw the color of the chemical, if one exists TODO this should be handled in chemical
        let eq = this.equipment;
        let chem = eq.contents;
        if(chem !== null){
            let tex = chem.texture;
            if(tex !== null){
                fill(color(tex));
                noStroke();
                let w = this.width();
                let offset = 0.2;
                let h = this.height();
                let oh = h * (1 - offset);
                var space = chem.mass / eq.capacity;
                rect(this.x() + w * 0.12, this.y() + h * offset + oh * (1 - space), w * 0.85, oh * space);
            }
        }

        // Draw the base beaker sprite
        super.draw();

        // Draw the text
        fill(color(0, 0, 0));
        noStroke();
        textSize(15);
        text(this.equipment.name, this.x() + 25, this.y() + this.height() / 2)
        var mass = "mass: "
        mass += (this.equipment.contents === null) ? "empty" : this.equipment.contents.mass;
        text(mass, this.x() + 25, this.y() + this.height() / 2 + 18)
    }

}