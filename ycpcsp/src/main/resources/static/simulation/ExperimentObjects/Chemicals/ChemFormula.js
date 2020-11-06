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
    Take a list of Chemicals and attempt to apply this formula to the list of chemicals.
    If all of the reactants exist in the given list, then formula will run, otherwise nothing will happen
    */
    processChemList(chems){
        // TODO create better searching algorithm for combining chemical properties
        let reacts = this.getReactants();
        let indexes = [];
        let toRemove = [];
        // Search through all chemicals for each reactant.
        //  If all reactants are found, run the formula, otherwise, do nothing
        var foundReactants = true;
        for(var r = 0; r < reacts.length && foundReactants; r++){
            var foundChem = false;
            for(var c = 0; c < chems.length && !foundChem; c++){
                // If the ID of the chemical matches the ID of the reactant, it is found
                if(chems[c].getID() === reacts[r].chemProp.getID()){
                    indexes.push(c);
                    toRemove.push(c);
                    foundChem = true;
                }
            }
            if(!foundChem) foundReactants = false;
        }

        // Do nothing if the reactants are not found
        if(!foundReactants) return;

        // Sort indexes so they are removed from the end first
        toRemove.sort(function(a, b){
            if(a === b) return 0;
            return (a > b) ? 1: -1;
        });

        // Get the mass of each chemical used in the reaction
        let reactQuantities = [];
        for(var i = 0; i < indexes.length; i++){
            reactQuantities.push(chems[indexes[i]].mass);
        }
        // Remove all chemicals from chems that were used in the reaction
        for(var i = 0; i < toRemove.length; i++){
            chems.splice(toRemove[i], 1);
        }

        // Calculate the reaction
        let prodQuantities = this.calculateProducts(reactQuantities);
        let products = this.getProducts();

        // Add all the reactants from the reaction
        for(var p = 0; p < prodQuantities.length; p++){
            // TODO account for concentration
            chems.push(idToChemical(products[p].chemProp.getID(), prodQuantities[p], 1).chemical);
        }
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