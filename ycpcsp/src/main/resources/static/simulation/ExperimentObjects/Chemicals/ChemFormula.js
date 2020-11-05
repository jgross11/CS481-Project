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