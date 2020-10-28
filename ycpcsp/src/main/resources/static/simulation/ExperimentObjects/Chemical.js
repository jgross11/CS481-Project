/**
A class that keeps track of a single Chemical. This can be a single element, or a compound.
*/
class Chemical extends ExperimentObject{

    /**
    Create a new Chemical with the given information
    mass: A floating point value, the amount of mass in this Chemical, in grams
    equation: A string, the equation for the components of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this Chemical
                or an image file representing the texture of this Chemical
    concentration: A floating point value in the range [0, 1] of the concentration of the chemical, default: 1
    */

    //TODO Give Formula
    constructor(mass = 1.0, equation = "", temperature = 20.0, texture = [127, 127, 127], concentration = 1){
        super(mass);
        this.equation = equation;
        this.temperature = temperature;
        this.texture = texture;
        this.concentration = concentration;

        // The current state of matter for this Chemical, based on temperature
        this.matterState = null;
    }

    /**
    Set the equation of this Chemical
    equation: A string, the equation for the components of this Chemical
    */
    setEquation(equation){
        this.equation = equation;
    }

    /**
    Set the temperature of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    */
    setTemperature(temperature){
        this.temperature = temperature;
    }

    /**
    Set the texture to use for rendering this Chemical
    texture: Either a list of rgb colors [red, green, blue] representing the color of this Chemical
                or an image file representing the texture of this Chemical
    */
    setTexture(texture){
        this.texture = texture;
    }

    /**
    Set the concentration of this Chemical
    concentration: A floating point value, the concentration, in the range [0, 1]
        If not in that range, it will be placed in the range
    */
    setConcentration(concentration){
        if(concentration > 1) concentration = 1;
        else if(concentration < 0) concentration = 0;
        this.concentration = concentration;
    }

    /**
    Get the ID representing this Chemical type
    */
    getID(){
        switch(this.equation){
            case "R": return ID_CHEM_TEST_RED;
            case "B": return ID_CHEM_TEST_BLUE;
            case "W": return ID_CHEM_TEST_WHITE;
            case "G": return ID_CHEM_TEST_GREEN;
            case "BL": return ID_CHEM_TEST_BLACK;
            default: return null;
        }
    }
}


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
    Get a list of all possible functions which this ChemicalController can perform.
    returns: an empty list, ChemicalController2D objects have no functions
    */
    getFuncDescriptions(){
        return [];
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
    Mix a list of Chemicals with a copy of this Controller's Chemical, and return the newly mixed Chemicals as a list
    Does nothing if either this Controller's Chemical, or the list, is null.
    Currently just mixes The chemical of this Controller with the first Chemical in the list
    chems: The Chemicals to mix
    returns: The list of chemicals Chemicals, or null if they could not be combined
    */
    combine(chems){
        if(chems === null) return null;
        let copy = this.copyChem();
        if(chems.length < 1) return [copy];
        let c1 = chems[0];
        let c2 = copy;
        if(c1 === null || c1 === undefined || c2 === null || c2 === undefined) return null;

        let t1 = c1.texture;
        let t2 = c2.texture;

        let totalMass = c1.mass + c2.mass;
        let r1 = c1.mass / totalMass;
        let r2 = c2.mass / totalMass;

        // Set the amount for each color based on the ratio of the mass of each chemical
        let tex = [t1[0] * r1 + t2[0] * r2, t1[1] * r1 + t2[1] * r2, t1[2] * r1 + t2[2] * r2];

        let newChems = [];
        let control = new ChemicalController2D(null);
        for(var i = 0; i < chems.length; i++){
            control.setChemical(chems[i]);
            newChems.push(control.copyChem());
        }
        newChems[0].setTexture(tex);
        newChems[0].setMass(totalMass);

        return newChems;
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
        if(c === null) return null;
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
        if(tex !== null && tex !== undefined){
            graphics.fill(color(tex));
            graphics.noStroke();
            let h = baseHeight;
            let oh = h * (1 - heightOffset);
            graphics.rect(x, y + h * heightOffset + oh * (1 - fillPercent), width, oh * fillPercent);
        }
    }

    /**
    Draw this chemical as a shape defined by vertices. Part of the shape can be drawn based on a percentage
    graphics: The P5 graphics object to draw the final picture onto
    buffer: The P5 graphics object to use as a buffer for drawing to graphics
        This buffer should be the size of the total space which the chemical visual cane take up
    x: The x coordinates to draw the chemical to graphics
    y: The y coordinates to draw the chemical to graphics
    vertices: A list of 2 element lists representing coordinates of where the chemical shape will be drawn
        All should be in the range of [0, 1], and will be scaled to fit the buffer
        The first and last vertices in the list will also connect together, completing the shape
    fillRatio: The percentage of the total shape which will be drawn. The shape starts being drawn at the bottom
    bottomFillPercent: The total percentage of buffer which is used to draw the shape, beginning with the bottom
    */
    drawShape(graphics, buffer, x, y, vertices, fillRatio, bottomFillPercent){
        let w = buffer.width;
        let h = buffer.height;

        buffer.push();
        buffer.fill(this.chemical.texture);
        buffer.noStroke();
        buffer.scale(w, h);
        buffer.beginShape();
        for(var i = 0; i < vertices.length; i++){
            buffer.vertex(vertices[i][0], vertices[i][1]);
        }
        buffer.endShape(CLOSE);
        buffer.pop();
        let ratio = h * bottomFillPercent * fillRatio;
        let hr = h - ratio;
        graphics.image(buffer, x, y + hr, w, ratio, 0, hr, w, ratio);
    }

}