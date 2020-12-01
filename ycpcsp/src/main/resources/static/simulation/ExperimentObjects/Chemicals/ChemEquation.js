/**
An object keeping track of data for a chemical equation
*/
class ChemEquation{

    /**
    Create a new instance of a chemical equation
    id: The id of the equation
    */
    constructor(id){
        this.id = id;
    }

    /**
    Get the properties based on this ChemEquation id
    return: The properties, or an empty object if no entry exists with the given ID
    */
    equationFromProperties(){
        let f = EQUATION_PROPERTIES[this.id];
        return (f === undefined) ? {} : f;
    }

    /**
    Get a list of all of the reactants of this ChemicalEquation, in the intended order
    return: The reactants as a list of EquationComponents
    */
    getReactants(){
        return this.equationFromProperties()[EQUATION_PROPERTY_REACTANTS];
    }

    /**
    Get a list of all of the products of this Chemical, in the intended order
    return: The products as a list of EquationComponents
    */
    getProducts(){
        return this.equationFromProperties()[EQUATION_PROPERTY_PRODUCTS];
    }

    /**
    Run the equation based on the given amounts of each reactant
    moles: A list of floating point values, the amount of moles of each reactant in the order they are in the equation
    returns: A list of two lists, all values are in moles.
        The first list contains the excess reactant of each reactant, formatted the same as moles.
            If there was no excess reactant for any of these values, the list value will be zero
        The second list contains the products, formatted the same as moles
    */
    calculateProducts(moles){
        let reacts = this.getReactants();
        let prods = this.getProducts();

        var lowest = -1;
        var excessReacts = [];
        var usedReacts = [];
        // Find the amount of the first product which each reactant will produce
        for(var i = 0; i < reacts.length; i++){
            // Convert the given number of moles to the amount of the first product
            excessReacts.push(moles[i] * (prods[0].coefficient / reacts[i].coefficient));
            // Keep track of the index of the lowest producing reactant
            if(lowest === -1 || excessReacts[i] < excessReacts[lowest]) lowest = i;
        }
        // The index of lowest is now the limiting reactant
        // Take the ratio of the limiting reactant to every other reactant to find the amount of the other reactants which were used
        for(var i = 0; i < reacts.length; i++){
            if(i !== lowest){
                // Convert the number of moles of limiting reactant into the corresponding number of moles for the ith reactant
                //  then subtract that from the number of moles of the ith reactant given to react
                excessReacts[i] = moles[i] - (moles[lowest] * reacts[i].coefficient / reacts[lowest].coefficient);
            }
        }
        // Set the limiting reactant to have an excess of 0
        excessReacts[lowest] = 0;

        // Find the amount of each reactant which is used
        for(var i = 0; i < reacts.length; i++){
            usedReacts.push(moles[i] - excessReacts[i]);
        }

        // Now use the perfect ratio list to produce the correct reactant moles
        // All product ratios will be the same at this point
        let ratio = usedReacts[0] / reacts[0].coefficient;

        // Apply that ratio to all products to get the final mole counts
        let prodMoles = [];
        for(var i = 0; i < prods.length; i++){
            prodMoles.push(prods[i].coefficient * ratio);
        }

        // Return the amount of excess reactant, and the moles of each product
        return [excessReacts, prodMoles];
    }

    /**
    Take a sparse list of Chemicals and attempt to apply this equation to the sparse list of chemicals.
    If all of the reactants exist in the given list, then equation will run, otherwise nothing will happen
    cDict: The sparse list of Chemicals to apply the equation. This will be the same object as the one given.
        Indexes should be the ID of the chemical, the value should be the chemical itself.
        Should be treated like a dictionary where the keys are indexes of the sparse list
    */
    processChemList(cDict){
        let reacts = this.getReactants();

        // ids is a list of all the ids of the reactants used in the equation, in the order of the equation
        let ids = [];
        // Search through all chemicals for each reactant.
        //  If all reactants are found, run the equation, otherwise, do nothing
        var foundReactants = true;
        for(var r = 0; r < reacts.length && foundReactants; r++){
            let id = reacts[r].chemProp.getID();
            let chem = cDict[id];
            if(chem !== undefined) ids.push(id);
            else foundReactants = false;
        }

        // Do nothing if the reactants are not found
        if(!foundReactants) return;

        // Get the moles of each chemical used in the reaction
        let reactMoles = [];
        let chemControl = new ChemicalController2D(null);
        for(var i = 0; i < ids.length; i++){
            chemControl.setChemical(cDict[ids[i]]);
            reactMoles.push(chemControl.calculateMoles());
        }

        // Calculate the reaction
        let reactionResults = this.calculateProducts(reactMoles);
        let excessMoles = reactionResults[0];
        let prodMoles = reactionResults[1];
        let products = this.getProducts();

        // Remove moles of chemicals from that were used in the reaction
        for(var i = 0; i < ids.length; i++){
            let c = cDict[ids[i]];
            // Delete the chemical if the corresponding reactant has no moles left
            if(excessMoles[i] === 0) delete cDict[ids[i]];

            // Otherwise, update the mass of that chemical
            else{
                chemControl.setChemical(c);
                c.setMass(chemControl.calculateMass(excessMoles[i]));
            }
        }

        // Add all the products from the reaction
        for(var p = 0; p < prodMoles.length; p++){
            let id = products[p].chemProp.getID();
            var c = cDict[id];
            // If the chemical does not yet exist, create the chemical and set the variable
            if(c === undefined){
                // TODO account for concentration
                cDict[id] = idToChemical(id, 0, 1).chemical;
                c = cDict[id];
            }
            // Now determine the mass for that product
            chemControl.setChemical(c);
            c.addMass(chemControl.calculateMass(prodMoles[p]));
        }

        return cDict;
    }

}

/**
An object keeping track of the components of a ChemEquation, i.e. reactants and products
*/
class EquationComponent{
    /**
    Create a EquationComponent, can be either a reactant or product
    coefficient: The amount of the chemical in the equation, must be an integer
    chemProp: The ChemicalProperties used by this EquationComponent
    */
    constructor(coefficient, chemProp){
        this.coefficient = coefficient;
        this.chemProp = chemProp;
    }

    /**
    Set the current coefficient of this EquationComponent
    coefficient: The new coefficient, must be a positive integer
    */
    setCoefficient(coefficient){
        this.coefficient = coefficient;
    }

    /**
    Set the current ChemicalProperties of this EquationComponent
    chemProp: The new ChemicalProperties
    */
    setChemProp(chemProp){
        this.chemProp = chemProp;
    }
}