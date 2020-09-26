/**
A class used to perform operations on chemicals in the context of a 2D environment
*/
class ChemicalController2D{

    /**
    Create a new Controller with the given chemical
    chemical: The chemical which this Controller will control
    */
    constructor(chemical){
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
    Determine the number of moles of the chemical in this controller
    returns: A floating point value, the number of moles
    */
    calculateMoles(){
        // TODO implement
        return 0;
    }

    /**
    Determine the state of matter of the chemical of this Controller.
    The result is stored in the matterState field in the chemical
    */
    calculateMatterState(){
        // TODO implement
    }

    /**
    Mix another Chemical with the Chemical of this Controller, and store that Chemical in this Controller.
    Does nothing if either chemical is null
    chemical: The chemical to mix
    returns: true if the Chemicals were combined, false otherwise
    */
    combine(chemical){
        let c1 = chemical;
        let c2 = this.chemical;
        if(c1 === null || c2 === null) return false;
        let t1 = c1.texture;
        let t2 = c2.texture;
        var tex = [(t1[0] + t2[0]) / 2, (t1[1] + t2[1]) / 2, (t1[2] + t2[2]) / 2];
        this.chemical.setTexture(tex);
        this.chemical.setMass(c1.mass + c2.mass);
        return true;
    }

    /**
    Draw a rectangular representation of this Chemical.
    This method is designed for rendering a constant width chemical with a varying height.
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