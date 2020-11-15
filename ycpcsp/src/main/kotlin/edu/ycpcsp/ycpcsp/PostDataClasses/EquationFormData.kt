package edu.ycpcsp.ycpcsp.PostDataClasses

class EquationFormData (var reactants : Array<Array<String>>, var products : Array<Array<String>>, var userID : Int){
    override fun toString() : String{
        var result = "Created by: $userID\n"
        result += reactants[0][0] + reactants[0][1]
        for(i in 1 until reactants.size){
            result += " + " + reactants[i][0] + reactants[i][1]
        }
        result += " --> "
        result += products[0][0] + products[0][1]
        for(i in 1 until products.size){
            result += " + " + products[i][0] + products[i][1]
        }
        return result
    }
}