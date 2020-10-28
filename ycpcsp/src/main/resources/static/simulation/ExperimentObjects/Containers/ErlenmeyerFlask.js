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
            case ID_EQUIP_FLASK_25mL: newAttributes = [[50, 80], 15.0, 25.0]; break;
            case ID_EQUIP_FLASK_50mL: newAttributes = [[62.5, 100], 20.0, 50.0]; break;
            case ID_EQUIP_FLASK_100mL: newAttributes = [[84, 136], 30.0, 100.0]; break;
            case ID_EQUIP_FLASK_1000mL: newAttributes = [[125, 200], 50.0, 1000.0]; break;
            default: break;
        }
        if(newAttributes !== null){
            this.setSize(newAttributes[0]);
            this.setMass(newAttributes[1]);
            this.setCapacity(newAttributes[2]);
        }
    }

    /**
    Get the ID representing this Flask
    */
    getID(){
        return this.id;
    }
}


/**
A class for handling controlling a Flask in a 2D environment
*/
class ErlenmeyerFlaskController2D extends ContainerController2D{
    /**
    Create a new ErlenmeyerController to control the given Flask
    erlenmeyer: The Flask which this Controller will control
    */
    constructor(erlenmeyer){
        super(erlenmeyer);
        this.chemFill = createGraphics(this.width(), this.height());
    }

    /**
    Determine if this Controller's Flask can contain the given Chemical.
    chemical: The Chemical to test if it can be contained
    */
    canContain(chemical){
        return true;
    }

    /**
    Draw this Controller's Flask along with its data
    graphics: The P5 graphics to use
    */
    draw(graphics){
        // Draw the color of the Chemical, if one exists
        let eq = this.equipment;
        if(eq.contents.length > 0){
            let chem = eq.contents[0];
            let chemController = new ChemicalController2D(chem);
            let x = this.x();
            let y = this.y();
            let w = this.width();
            let h = this.height();

            // TODO move this code to ChemicalController2D, including all cropping
            let cf = this.chemFill;
            cf.fill(chem.texture);
            cf.noStroke();
            cf.beginShape();
            cf.vertex(0.01 * w, 0.95 * h);
            cf.vertex(0.5 * w, 1 * h);
            cf.vertex(0.99 * w, 0.95 * h);
            cf.vertex(0.64 * w, 0.3 * h);
            cf.vertex(0.32 * w, 0.3 * h);
            cf.endShape(CLOSE);
            let ratio = h * .65 * chem.mass / eq.capacity;
            graphics.image(cf, x, y + h - ratio, w, ratio,
                0, h - ratio, w, ratio);
        }

        // Draw the base Flask sprite
        super.draw(graphics);
    }

}