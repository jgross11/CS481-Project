// Constants for keeping track of states of matter
let MATTER_STATE_SOLID = 0;
let MATTER_STATE_LIQUID = 1;
let MATTER_STATE_GAS = 2;

/**
A class that keeps track of a single Chemical. This can be a single element, or a compound.
*/
class Chemical extends ExperimentObject{

    /**
    Create a new Chemical with the given information
    mass: A floating point value, the amount of mass in this Chemical, in grams
    properties: A ChemProperties object used to specify the properties of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    concentration: A floating point value in the range [0, 1] of the concentration of the chemical, default: 1
    */
    constructor(mass = 1.0, properties = null, temperature = 20.0, concentration = 1){
        super(mass);
        this.properties = properties;
        this.temperature = temperature;
        this.concentration = concentration;

        // The current state of matter for this Chemical, based on temperature
        this.matterState = MATTER_STATE_LIQUID;
    }

    /**
    Set the properties object of this Chemical
    properties: The properties object
    */
    setProperties(properties){
        this.properties = properties;
    }

    /**
    Set the temperature of this Chemical
    temperature: A floating point value, the temperature, in celsius, of this Chemical
    */
    setTemperature(temperature){
        this.temperature = temperature;
    }

    /**
    Get the texture to use for rendering this Chemical
    return: A list of 3 or 4 values [red, green, blue, alpha], alpha is option representing the color of this Chemical
    */
    getTexture(){
        switch(this.matterState){
            case MATTER_STATE_SOLID: return this.properties.getSolidColor();
            case MATTER_STATE_LIQUID: return this.properties.getLiquidColor();
            case MATTER_STATE_GAS: return this.properties.getGasColor();
            default: return null;
        }
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
        return this.properties.getID();
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
        this.calculateMatterState();
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
        // TODO implement based on molar mass
        return 0;
    }

    /**
    Determine the state of matter of this Controller's Chemical.
    The result is stored in the matterState field in the Chemical
    */
    calculateMatterState(){
        // TODO implement based on melting and boiling point
    }

    /**
    Mix a list of Chemicals with a copy of this Controller's Chemical, and return the newly mixed Chemicals as a list.
    Does nothing if the list is null. Will still operate on list of Chemicals if this Controller's chemical is null.
    This method does not change this Controller's Chemical.
    This method will combine all common elements in the given list, i.e. if the list has two instances of chemicalA,
        they wil both be combined into one instance of chemicalA, with the combined mass of both instances of chemicalA.
    Currently combines common Chemicals, but does not perform chemical equation interactions
    Also ensures that the chemicals are sorted by density.
    chems: The Chemicals to combine
    returns: The list of Chemicals, or null if they could not be combined
    */
    combine(chems){
        // Checking to make sure parameters exist
        if(!Array.isArray(chems) || chems === null) return null;
        if(this.chemical !== null) chems.push(this.copyChem());
        if(chems.length < 1) return chems;

        // Go through each Chemical in the list and see if any chemicals can be combined from having the same ID
        let indexes = {};
        let control = new ChemicalController2D(null);
        for(var i = 0; i < chems.length; i++){
            let c = chems[i];
            let cID = c.getID();
            let indexed = indexes[cID];

            // If the current chemical has not yet been indexed, add it to the index dictionary
            if(indexed === undefined){
                control.setChemical(c);
                let newC = control.copyChem();
                indexes[cID] = newC;
                chems[i] = newC;
            }
            // If the chemical exists, combine their masses and remove the common instance from the list
            else{
                // TODO handle concentration values
                indexed.setMass(indexed.mass + c.mass);
                chems.splice(i, 1);
                i--;
            }
        }

        // Create a dictionary of chem list
        // TODO put this whole dictionary to array and back in another method
        let cDict = [];
        for(var i = 0; i < chems.length; i++){
            let c = chems[i];
            cDict[c.getID()] = c;
        }

        // Check for if each of the formulas can be applied to the dictionary
        FORMULA_PROPERTIES.forEach(function(obj, id){
            let formula = new ChemFormula(id);
            formula.processChemList(this);
        }, cDict);

        // Clear out the chems list
        chems.splice(0, chems.length);

        // Add all elements from the dictionary to the chem list
        cDict.forEach(function(obj, i){
            chems.push(obj);
        }, chems);

        // Sort the chemicals by their densities, smallest at the end
        /*
        TODO improve this by inserting new chemicals based on their density, rather than sorting each time,
            also move it to above the combining
            This is so they can be inserted by density as they are added back to chem list
        */
        return chems.sort(function(a, b){
            let ad = a.properties.getDensity();
            let bd = b.properties.getDensity();
            if(ad === bd) return 0;
            return (ad > bd) ? -1 : 1;
        });
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
        return new Chemical(c.mass, c.properties, c.temperature, c.concentration);
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
        let tex = this.chemical.getTexture();
        if(tex === null || tex === undefined) return;
        graphics.fill(tex);
        graphics.noStroke();
        let h = baseHeight;
        let oh = h * (1 - heightOffset);
        graphics.rect(x, y + h * heightOffset + oh * (1 - fillPercent), width, oh * fillPercent);
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
        let tex = this.chemical.getTexture();
        if(tex === null || tex === undefined) return;

        let w = buffer.width;
        let h = buffer.height;

        buffer.push();
        buffer.fill(tex);
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

/**
Draw all of the chemicals in a rectangle.
Chemicals at the beginning of the list get drawn first at the bottom of the rectangle
graphics: The P5 graphics object to draw the rectangles to
chems: The list of Chemical objects to be rendered
totalQuantity: The total of the quantities of all the Chemicals in chems
x: The x position to draw the rectangles
y: The y position to draw the rectangles
w: The width to draw the rectangle
h: The height to draw the rectangle
*/
function drawChemicalRectMultiple(graphics, chems, totalQuantity, x, y, w, h){
    var currentY = y + h;
    for(var i = 0; i < chems.length; i++){
        let c = chems[i];
        let tex = c.getTexture();
        if(tex !== null && tex !== undefined){
            var hPerc = h * c.mass / totalQuantity;
            graphics.fill(tex);
            graphics.noStroke();
            currentY -= hPerc;
            graphics.rect(x, currentY, w, hPerc);
        }
    }
}

/**
Draw all of the chemicals in a shape defined by vertices, splitting the shape based on the amount of each chemical.
Chemicals at the beginning of the list get drawn first at the bottom of the shape
graphics: The P5 graphics object to draw the shape to
chems: The list of Chemical objects to be rendered
totalQuantity: The total of the quantities of all the Chemicals in chems
vertices: A list of [x, y] coordinates for where the vertices will be placed.
    These are percentages based on the width and height of buffer
x: The x position to draw the shape
y: The y position to draw the shape
buffer: The P5 graphics object used for drawing the shapes.
*/
function drawChemicalShapeMultiple(graphics, chems, totalQuantity, vertices, x, y, buffer){
    let w = buffer.width;
    let h = buffer.height;
    buffer.push();
    buffer.noStroke();
    buffer.scale(w, h);
    var currentY = y + h;
    for(var i = 0; i < chems.length; i++){
        let c = chems[i];
        let tex = c.getTexture();
        if(tex !== null && tex !== undefined){
            buffer.clear();
            buffer.fill(tex);
            buffer.beginShape();
            for(var j = 0; j < vertices.length; j++){
                buffer.vertex(vertices[j][0], vertices[j][1]);
            }
            buffer.endShape(CLOSE);
            let ratio = h * c.mass / totalQuantity;
            let hr = h - ratio;
            currentY -= ratio;
            graphics.image(buffer, x, currentY, w, ratio, 0, currentY - y, w, ratio);
        }
    }
    buffer.pop();
}