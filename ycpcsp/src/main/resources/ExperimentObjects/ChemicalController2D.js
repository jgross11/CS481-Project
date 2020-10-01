/**
A class used to perform operations on Chemicals in the context of a 2D environment
*/
class ChemicalController2D extends ExperimentObjectController2D{

    /**
    Create a new Controller with the given Chemical
    chemical: The Chemical which this Controller will control
    */
    constructor(chemical){
        super();
        this.chemical = chemical;
    }

    /**
    Set the Chemical controlled by this Controller
    chemical: The Chemical to set
    */
    setChemical(chemical){
        this.chemical = chemical;
    }

    /**
    Get the Chemical controlled by this Controller
    returns: The Chemical
    */
    getObject(){
        return this.chemical;
    }

    /**
    Determine the number of moles of the Chemical in this Controller
    returns: A floating point value, the number of moles
    */
    calculateMoles(){
        // TODO implement
        return 0;
    }

    /**
    Determine the state of matter of the Chemical of this Controller.
    The result is stored in the matterState field in the Chemical
    */
    calculateMatterState(){
        // TODO implement
    }

    /**
    Mix another Chemical with the Chemical of this Controller, and store that Chemical in this Controller.
    Does nothing if either Chemical is null
    chemical: The Chemical to mix
    returns: true if the Chemicals were combined, false otherwise
    */
    combine(chemical){
        let c1 = chemical;
        let c2 = this.chemical;
        if(c1 === null || c2 === null) return false;

        let t1 = c1.texture;
        let t2 = c2.texture;

        let totalMass = c1.mass + c2.mass;
        let r1 = c1.mass / totalMass;
        let r2 = c2.mass / totalMass;

        // Set the amount for each color based on the ratio of the mass of each chemical
        var tex = [t1[0] * r1 + t2[0] * r2, t1[1] * r1 + t2[1] * r2, t1[2] * r1 + t2[2] * r2];

        this.chemical.setTexture(tex);
        this.chemical.setMass(totalMass);

        return true;
    }

    /**
    Take this Chemical and split its mass into two parts.
    This Chemical will have the given percent, the remainder will be returned.
    The returned Chemical will be completely separate from this Chemical
    percent: The percentage of the Chemical to remain in this object. Must be in the range [0, 1]
    returns: A Chemical with all the same properties as this Chemical, but with the remainder of the mass
        Also can return null if the Chemical could not be split
    */
    split(percent){
        let c = this.chemical
        if(percent < 0 || percent > 1 || c === null) return null;
        var chem = new Chemical(c.mass * (1 - percent), c.equation, c.temperature, c.texture, c.concentration);
        c.setMass(c.mass * percent);
        return chem;
    }

    /**
    Draw a rectangular representation of this Chemical.
    This method is designed for rendering a constant width Chemical with a varying height.
    x: The x position of where the Chemical should be drawn
    y: The y position of where the Chemical should be drawn
    fillPercent: The percentage of the total height which is filled, in range [0, 1]
    width: The width of the rectangle
    baseHeight: The height before the fillPercent is applied
    heightOffset: The percentage of the height which cannot be filled
    */
    drawRect(x, y, fillPercent, width, baseHeight, heightOffset){
        let tex = this.chemical.texture;
        if(tex !== null){
            fill(color(tex));
            noStroke();
            let h = baseHeight;
            let oh = h * (1 - heightOffset);
            rect(x, y + h * heightOffset + oh * (1 - fillPercent), width, oh * fillPercent);
        }
    }

}