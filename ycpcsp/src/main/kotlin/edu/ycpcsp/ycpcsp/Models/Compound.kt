package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical compound.
 *
 * CompoundID - the ID of this compound within the DB
 * formula - the chemical formula of this compound ex. H2O
 * name - the name of this compound ex. Hydrogen
 * density - the density of this compound
 * isWaterSoluble - determines whether this compound is water soluble
 * solidTemp - the temperature at which this compound becomes a solid
 * gasTemp - the temperature at which this compound becomes a gas
 * liquidTemp - the temperature at which this compound becomes a liquid
 */

class Compound (var compoundID : Int, var formula : String, var name : String, var mass : Double, var density : Double, var isWaterSoluable : Boolean, var solidTemp : Double, var gasTemp : Double){

    var colors = ChemicalColorStates()
    // null constructor
    constructor() : this(-1, "", "", 0.0, 0.0, false, 0.0, 0.0){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(formula: String, name: String, mass: Double, density: Double, isWaterSoluable: Boolean, solidTemp: Double, gasTemp: Double) : this(
            -1, formula, name, mass, density, isWaterSoluable, solidTemp, gasTemp){
    }

    override fun toString() : String{
        return "$name: $formula | id=$compoundID, mass = $mass, density=$density, watersoluble: $isWaterSoluable, gas @ ${gasTemp}C, solid @ ${solidTemp}C, colors: ${colors.toString()}\n"
    }

}