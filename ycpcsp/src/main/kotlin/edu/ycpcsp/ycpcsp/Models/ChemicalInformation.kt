package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains all relevant information for a chemical chemical.
 *
 * chemicalInformationID - the ID of this chemical within the DB
 * formula - the chemical formula of this chemical ex. H2O
 * name - the name of this chemical ex. Hydrogen
 * mass - the mass of this chemical
 * density - the density of this chemical
 * isWaterSoluble - determines whether this chemical is water soluble
 * solidTemp - the temperature at which this chemical becomes a solid
 * gasTemp - the temperature at which this chemical becomes a gas
 * creatorID - the user ID of the person who submitted this information to DB
 */

class ChemicalInformation (var chemicalInformationID : Int, var formula : String, var name : String, var mass : Double, var density : Double, var isWaterSoluable : Boolean, var solidTemp : Double, var gasTemp : Double, var creatorID : Int, var Rating: Int){

    var colors = ChemicalColorStates()
    // null constructor
    constructor() : this(-1, "", "", 0.0, 0.0, false, 0.0, 0.0, -1,0){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(formula: String, name: String, mass: Double, density: Double, isWaterSoluable: Boolean, solidTemp: Double, gasTemp: Double, Rating: Int) : this(
            -1, formula, name, mass, density, isWaterSoluable, solidTemp, gasTemp, -1,0){
    }

    override fun toString() : String{
        return "$name: $formula | created by userid = $creatorID | id=$chemicalInformationID, mass = $mass, density=$density, watersoluble: $isWaterSoluable, gas @ ${gasTemp}C, solid @ ${solidTemp}C, rating @ ${Rating}C, colors: ${colors.toString()}\n"
    }

}