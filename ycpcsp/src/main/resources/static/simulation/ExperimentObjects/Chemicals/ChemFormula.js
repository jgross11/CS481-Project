/**
An object keeping track of data for a chemical formula
*/
class ChemFormula{

    /**
    Create a new instance of a chemical formula
    id: The id of the formula
    */
    constructor(id){
        this.id = id;
    }

    /**
    Get the properties based on this ChemFormula id
    return: The properties, or an empty object if no entry exists with the given ID
    */
    formulaFromProperties(){
        let f = FORMULA_PROPERTIES[this.id];
        return (f === undefined) ? {} : f;
    }

    /**
    Get a list of all of the reactants of this ChemicalFormula, in the intended order
    return: The reactants as a list of FormulaComponents
    */
    getReactants(){
        return this.formulaFromProperties()[FORMULA_PROPERTY_REACTANTS];
    }

    /**
    Get a list of all of the products of this ChemicalFormula, in the intended order
    return: The products as a list of FormulaComponents
    */
    getProducts(){
        return this.formulaFromProperties()[FORMULA_PROPERTY_PRODUCTS];
    }

    /**
    Run the formula based on the given amounts of each reactant
    quantities: A list of floating point values, the amount of each reactant in the order they are in the formula
    returns: A list of all of the quantities of all the products, formatted the same as quantities
    */
    calculateProducts(quantities){
        // TODO account for the amount of each product which would be produced based on a balanced equation
        var total = 0;
        for(var i = 0; i < quantities.length; i++) total += quantities[i];
        let prods = this.getProducts();
        let prodQuantities = [];
        let amount = total / prods.length;
        for(var i = 0; i < prods.length; i++) prodQuantities.push(amount);
        return prodQuantities;
    }

    /**
    Take a sparse list of Chemicals and attempt to apply this formula to the sparse list of chemicals.
    If all of the reactants exist in the given list, then formula will run, otherwise nothing will happen
    cDict: The sparse list of Chemicals to apply the formula.
        Indexes should be the ID of the chemical, the value should be the chemical itself.
        Should be treated like a dictionary where the keys are indexes of the sparse list
    */
    processChemList(cDict){
        let reacts = this.getReactants();
        let ids = [];
        // Search through all chemicals for each reactant.
        //  If all reactants are found, run the formula, otherwise, do nothing
        var foundReactants = true;
        for(var r = 0; r < reacts.length && foundReactants; r++){
            let id = reacts[r].chemProp.getID();
            let chem = cDict[id];
            if(chem !== undefined) ids.push(id);
            else foundReactants = false;
        }

        // Do nothing if the reactants are not found
        if(!foundReactants) return;

        // Get the mass of each chemical used in the reaction
        let reactQuantities = [];
        for(var i = 0; i < ids.length; i++){
            reactQuantities.push(cDict[ids[i]].mass);
        }

        // Remove all chemicals from chems that were used in the reaction
        for(var i = 0; i < ids.length; i++){
            delete cDict[ids[i]];
        }

        // Calculate the reaction
        let prodQuantities = this.calculateProducts(reactQuantities);
        let products = this.getProducts();

        // Add all the reactants from the reaction
        for(var p = 0; p < prodQuantities.length; p++){
            // TODO account for concentration
            let id = products[p].chemProp.getID();
            let c = cDict[id];
            if(c === undefined) cDict[id] = idToChemical(id, prodQuantities[p], 1).chemical;
            else cDict[id].setMass(c.mass + prodQuantities[p]);
        }

        return cDict;
    }

}

/**
An object keeping track of the components of a ChemFormula, i.e. reactants and products
*/
class FormulaComponent{
    /**
    Create a FormulaComponent, can be either a reactant or product
    coefficient: The amount of the chemical in the formula, must be an integer
    chemProp: The ChemicalProperties used by this FormulaComponent
    */
    constructor(coefficient, chemProp){
        this.coefficient = coefficient;
        this.chemProp = chemProp;
    }

    /**
    Set the current coefficient of this FormulaComponent
    coefficient: The new coefficient, must be a positive integer
    */
    setCoefficient(coefficient){
        this.coefficient = coefficient;
    }

    /**
    Set the current ChemicalProperties of this FormulaComponent
    chemProp: The new ChemicalProperties
    */
    setChemProp(chemProp){
        this.chemProp = chemProp;
    }
}