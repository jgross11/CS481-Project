package edu.ycpcsp.ycpcsp.Models

/**
 * This class represents either a product or reactant within an equation.
 * coefficient - the number to the left of the chemical in an equation
 * chemicalID - the chemical information ID of this chemical
 */
class EquationComponent (var coefficient: Int, var chemicalID: Int){

    // null constructor
    constructor () : this(-1, -1){}

    override fun toString() : String{
        return "equation component: coefficient=$coefficient | chemicalID = $chemicalID"
    }
}