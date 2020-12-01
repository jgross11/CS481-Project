package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical equation.
 *
 * equationID - the ID of this equation in the DB
 * reactants - an array of EquationComponents representing the reactants in this equation
 * products - an array of EquationComponents representing the products in this equation
 * creatorID - the ID of this equations' creator in the DB
 */

class ChemicalEquation (var equationID : Int, var creatorID : Int){

    var reactants = Array(0){EquationComponent()}
    var products = Array(0){EquationComponent()}
    // null constructor
    constructor() : this(-1, -1){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(creatorID: Int) : this(-1, creatorID){

    }

    override fun toString() : String{
        var result = "Created by: $creatorID with ID $equationID\n"
        for(i in reactants.indices){
            result += "reactant: ${reactants[i].coefficient} of ID ${reactants[i].chemicalID}\n"
        }
        for(i in products.indices){
            result += "product: ${products[i].coefficient} of ID ${products[i].chemicalID}\n"
        }
        return result
    }

}