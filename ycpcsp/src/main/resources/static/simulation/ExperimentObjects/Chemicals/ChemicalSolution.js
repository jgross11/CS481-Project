/**
A class representing an instance of a solution, i.e. one or more solvents dissolved in a solute
*/
class ChemicalSolution extends Chemical{
    /**
    Create a new ChemicalSolution
    solute: The Chemical of the solute of this Solution
    solvents: A list of the Chemicals of the solvents dissolved in the solute
    */
    constructor(solute, solvents){
        super(0);
        this.solute = solute;
        this.solvents = solvents;
        this.setCalculatedMass();
    }

    /**
    Set the current Chemical used as the solute of this Solution
    solute: The new Chemical for the solute
    */
    setSolute(solute){
        this.solute = solute;
    }

    /**
    Set the list of Chemicals used as the solvents of this Solution
    solvents: The new Chemicals for the solvents, must be a list
    */
    setSolvents(solvents){
        this.solvents = solvents;
    }

    /**
    Get the current state of matter of this ChemicalSolution
    returns: The state, based on the defined constants in Chemicals.js
    */
    getMatterState(){
        return this.solute.matterState;
    }

    /**
    Determine the mass of this Solution in grams, based on its solutes and solvents
    return: The mass
    */
    calculateMass(){
        var m = this.solute.getMass();
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            m += solvs[i].getMass();
        }
        return m;
    }

    /**
    Determine the mass of this Solution in grams, based on its solutes and solvents, and set the mass field
    */
    setCalculatedMass(){
        super.setMass(this.calculateMass());
    }

    /**
    Set the mass of this ChemicalSolution, maintaining the relative ratios of solvents and solutes
    mass: The new mass, a positive floating point value
    */
    setMass(mass){
        let oldMass = this.getMass();
        if(oldMass <= 0) return;
        let ratio = mass / oldMass;

        this.solute.setMass(this.solute.getMass() * ratio);

        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            solvs[i].setMass(solvs[i].getMass() * ratio);
        }
        super.setMass(mass);
    }

    /**
    Set the temperature of this Solution
    temperature: A floating point value, the temperature, in celsius, of this Solution
    */
    setTemperature(temperature){
        super.setTemperature(temperature);
        this.solute.setTemperature(temperature);
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            solvs[i].setTemperature(temperature);
        }
    }

    /**
    ChemicalSolutions do not have an ID
    returns: Always undefined
    */
    getID(){
        return undefined;
    }

    /**
    Solutions have no creator, this always returns solution
    */
    getCreator(){
        return "Solution"
    }

    /**
    Get the name of this Solution
    returns: The name
    */
    getName(){
        var s = "";
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            s += solvs[i].getName();
            if(i < solvs.length - 1) s += ", and ";
        }
        return s + " dissolved into " + this.solute.getName();
    }

    /**
    Get the symbol of this Solution
    returns: The symbol
    */
    getSymbol(){
        var s = this.solute.getSymbol() + ": ";
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            s += solvs[i].getSymbol();
            if(i < solvs.length - 1) s += ", ";
        }
        return s;
    }

    /*
    Get the solid color property of this Solution
    returns: The color
    */
    getSolidColor(){
        return this.getColorWeightCombine(MATTER_STATE_SOLID);
    }

    /*
    Get the liquid color property of this Solution
    returns: The color
    */
    getLiquidColor(){
        return this.getColorWeightCombine(MATTER_STATE_LIQUID);
    }

    /*
    Get the gas color property of this Solution
    returns: The color
    */
    getGasColor(){
        return this.getColorWeightCombine(MATTER_STATE_GAS);
    }

    /**
    Helper method for getting solid, liquid, and gas colors.
    Combines colors based on the colors obtained from a function
    stateType: The state for the color, use the matter state constants defined in Chemical.js
    returns: The color, or null if the ChemicalSolution has invalid solutes or solvents
    */
    getColorWeightCombine(stateType){
        // Ensuring infinite recursion doesn't happen if non chemicals are parts of the solution
        if(this.solute instanceof ChemicalSolution) return null;

        // Begin the lists with the solute
        var cs = [this.solute.getTexture(stateType)];
        let ws = [this.solute.getVolume()];

        // Create a list of all the textures and volumes for relative weights
        for(var i = 0; i < this.solvents.length; i++){
            // Ensuring infinite recursion doesn't happen if non chemicals are parts of the solution
            if(this.solvents[i] instanceof ChemicalSolution) return null;
            cs.push(this.solvents[i].getTexture(stateType));
            ws.push(this.solvents[i].getVolume());
        }
        // Combine all the colors together
        return colorRatioMultiple(cs, ws);
    }

    /**
    Get the molar mass of this solution
    returns: The molar mass
    */
    getMolarMass(){
        // If the solute is a ChemicalSolution, it is invalid, return -1
        if(this.solute instanceof ChemicalSolution) return -1;

        // Find the total number of moles
        let chemControl = new ChemicalController2D(this.solute);
        var total = chemControl.calculateMoles();
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            // If any solvents are ChemicalSolutions, they are invalid, return -1
            if(solvs[i] instanceof ChemicalSolution) return -1;
            chemControl.setChemical(solvs[i]);
            total += chemControl.calculateMoles();
        }

        // Divide the mass by the number of moles
        return this.getMass() / total;
    }

    /**
    Get the melting point property of this Solution
    returns: The temperature, in Celsius
    */
    getMeltingPoint(){
        return this.solute.getMeltingPoint();
    }

    /**
    Get the boiling point property of this Solution
    returns: The temperature, in Celsius
    */
    getBoilingPoint(){
        return this.solute.getBoilingPoint();
    }

    /**
    Get the density property of this Solution
    returns: The density
    */
    getDensity(){
        // Get the density of the solute with ratio to its mass
        var total = this.solute.getVolume();

        // Get the density of all solvents with ratio to their masses
        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            total += solvs[i].getVolume();
        }

        // Determine the final density based on the relative masses of the solute and solvents
        return total / this.getMass();
    }

    /**
    Solutions are never water soluble, this method always returns false
    */
    getWaterSolubility(){
        return false;
    }

    /**
    Get the solute or a solvent of this ChemicalSolution which matches the given Chemical
    chem: The chemical to test
    returns: The Chemical if one of the chemicals match, null otherwise. Always returns null if chem is a ChemicalSolution
    */
    containingChem(chem){
        if(chem instanceof ChemicalSolution) return null;
        let id = chem.getID();
        if(id === this.solute.getID()) return this.solute;

        let solvs = this.solvents;
        for(var i = 0; i < solvs.length; i++){
            if(id === solvs[i].getID()) return solvs[i];
        }
        return null;
    }

    /**
    Make an exact copy of this ChemicalSolution
    returns: The ChemicalSolution copy, or null if this ChemicalSolution is invalid
    */
    copyChem(){
        let s = [];
        let solvs = this.solvents;
        if(this.solute instanceof ChemicalSolution) return;
        for(var i = 0; i < solvs.length; i++){
            if(!(solvs[i] instanceof ChemicalSolution)) s.push(solvs[i].copyChem());
        }
        return new ChemicalSolution(this.solute.copyChem(), s);
    }
}