package edu.ycpcsp.ycpcsp.Models

class ChemicalColorStates (var gasColor: Int, var liquidColor: Int, var solidColor: Int){

    constructor() : this(-1, -1, -1){}

    override fun toString(): String {
        return "gas: $gasColor | liquid: $liquidColor | solid: $solidColor\n"
    }
}