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
    Set this Controller's Chemical
    chemical: The Chemical to set
    */
    setChemical(chemical){
        this.chemical = chemical;
    }

    /**
    Get this Controller's Chemical
    returns: The Chemical
    */
    getObject(){
        return this.chemical;
    }

    /**
    Determine if this Controller's Chemical can be placed down on its own. Chemicals cannot be placed on their own.
    returns: false, always
    */
    canPlace(){
        return false;
    }

    /**
    Convert the given id to its corresponding function
    id: The id to convert
    returns: The function of the id
    */
    idToFunc(id){
        switch(id){
            default: return null;
        }
    }

    /**
    Convert the given function to its corresponding id
    func: The function to convert
    returns: The id of the function
    */
    funcToId(func){
        switch(func){
            default: return null;
        }
    }

    /**
    Determine the number of moles of this Controller's Chemical
    returns: A floating point value, the number of moles
    */
    calculateMoles(){
        // TODO implement
        return 0;
    }

    /**
    Determine the state of matter of this Controller's Chemical.
    The result is stored in the matterState field in the Chemical
    */
    calculateMatterState(){
        // TODO implement
    }

    /**
    Mix another Chemical with this Controller's Chemical, and store that Chemical in this Controller.
    Does nothing if either Chemical is null
    chemical: The Controller with the Chemical to mix
    returns: true if the Chemicals were combined, false otherwise
    */
    combine(chemical){
        if(chemical === null) return false;
        let c1 = chemical.chemical;
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
    Take this Controller's Chemical and split its mass into two parts.
    this Controller's Chemical will have the given percent, the remainder will be returned.
    The returned Chemical will be completely separate from this Controller's Chemical
    percent: The percentage of the Chemical to remain in this object. Must be in the range [0, 1]
    returns: A Chemical with all the same properties as this Controller's Chemical, but with the remainder of the mass
        Also can return null if the Chemical could not be split
    */
    split(percent){
        let c = this.chemical
        if(percent < 0 || percent > 1 || c === null) return null;
        var chem = this.copyChem();
        chem.setMass(chem.mass * (1 - percent));
        c.setMass(c.mass * percent);
        return chem;
    }

    /**
    Make an exact copy of this Controller's Chemical
    returns: The Chemical copy
    */
    copyChem(){
        let c = this.chemical
        return new Chemical(c.mass, c.equation, c.temperature, c.texture, c.concentration);
    }

    /**
    Draw a rectangular representation of this Controller's Chemical.
    This method is designed for rendering a constant width Chemical with a varying height.
    x: The x position of where the Chemical should be drawn
    y: The y position of where the Chemical should be drawn
    fillPercent: The percentage of the total height which is filled, in range [0, 1]
    width: The width of the rectangle
    baseHeight: The height before the fillPercent is applied
    heightOffset: The percentage of the height which cannot be filled
    graphics: The P5 graphics to use
    */
    drawRect(x, y, fillPercent, width, baseHeight, heightOffset, graphics){
        let tex = this.chemical.texture;
        if(tex !== null){
            graphics.fill(color(tex));
            graphics.noStroke();
            let h = baseHeight;
            let oh = h * (1 - heightOffset);
            graphics.rect(x, y + h * heightOffset + oh * (1 - fillPercent), width, oh * fillPercent);
        }
    }

}