package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical equation.
 *
 * equationID - the ID of this equation in the DB
 * reactants - an array of strings representing the reactants in this equation in a human readable way
 * products - an array of strings representing the products in this equation in a human readable way
 */

class ChemicalEquationResult (var equationID : Int){

    var reactants = Array(0){String()}
    var products = Array(0){String()}
    var string = "EMPTY - PLEASE REMEMBER TO SET ON BACK END"

    override fun toString() : String{
        var result = ""
        if(reactants.isNotEmpty()){
            result += reactants[0]
            for(i in 1 until reactants.size){
                result += " + ${reactants[i]}"
            }
        }

        result += " → "
        if(products.isNotEmpty()){
            result += products[0]
            for(i in 1 until products.size){
                result += " + ${products[i]}"
            }
        }
        return result
    }

}