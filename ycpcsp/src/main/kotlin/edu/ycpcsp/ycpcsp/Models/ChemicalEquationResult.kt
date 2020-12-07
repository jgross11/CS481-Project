package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical equation.
 *
 * equationID - the ID of this equation in the DB
 * reactants - an array of strings representing the reactants in this equation in a human readable way
 * products - an array of strings representing the products in this equation in a human readable way
 */

class ChemicalEquationResult (var equationID : Int){

    var reactantFormulas = Array(0){String()}
    var reactantCoefficients = intArrayOf()
    var productFormulas = Array(0){String()}
    var productCoefficients = intArrayOf()
    var string = "EMPTY - PLEASE REMEMBER TO SET ON BACK END"

    override fun toString() : String{
        var result = ""
        if(reactantFormulas.isNotEmpty()){
            result += if (reactantCoefficients[0] == 1) reactantFormulas[0] else "${reactantCoefficients[0]}${reactantFormulas[0]}"
            for(i in 1 until reactantFormulas.size){
                result += if (reactantCoefficients[i] == 1) " + ${reactantFormulas[i]}" else " + ${reactantCoefficients[i]}${reactantFormulas[i]}"
            }
        }

        result += " → "
        if(productFormulas.isNotEmpty()){
            result += if (productCoefficients[0] == 1) productFormulas[0] else "${productCoefficients[0]}${productFormulas[0]}"
            for(i in 1 until productFormulas.size){
                result += if (productCoefficients[i] == 1) " + ${productFormulas[i]}" else " + ${productCoefficients[i]}${productFormulas[i]}"
            }
        }
        return result
    }

}