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

class Compound (var compoundID : Int, var formula : String, var name : String, var density : Double, var isWaterSoluable : Boolean, var solidTemp : Double, var gasTemp : Double, var liquidTemp : Double){

    // null constructor
    constructor() : this(-1, "", "", 0.0, false, 0.0, 0.0, 0.0){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(formula: String, name: String, density: Double, isWaterSoluable: Boolean, solidTemp: Double, gasTemp: Double, liquidTemp: Double) : this(
            -1, formula, name, density, isWaterSoluable, solidTemp, gasTemp, liquidTemp){
    }

    override fun toString() : String{
        return "$name: $formula | id=$compoundID, density=$density, watersoluble: $isWaterSoluable, gas @ ${gasTemp}C, liquid @ ${liquidTemp}C, solid @ ${solidTemp}C\n"
    }

}