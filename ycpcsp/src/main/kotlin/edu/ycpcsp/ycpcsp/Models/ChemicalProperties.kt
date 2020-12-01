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

class ChemicalProperties (var chemicalInformationID : Int,
                          var formula : String,
                          var name : String,
                          var molarMass : Double,
                          var density : Double,
                          var isWaterSoluble : Boolean,
                          var meltingPoint : Double,
                          var boilingPoint : Double,
                          var creatorID : Int,
                          var rating : Int){

    var colors = ChemicalColorStates()
    // null constructor
    constructor() : this(-1, "", "", 0.0, 0.0, false, 0.0, 0.0, -1,0){

    }

    // used when compound is first created on FE and given to BE (before ID exists in DB)
    constructor(formula: String, name: String, mass: Double, density: Double, isWaterSoluable: Boolean, solidTemp: Double, gasTemp: Double, Rating: Int) : this(
            -1, formula, name, mass, density, isWaterSoluable, solidTemp, gasTemp, -1,0){
    }

    override fun toString() : String{
        return "$name: $formula | created by userid = $creatorID | id=$chemicalInformationID, mass = $molarMass, density=$density, watersoluble: $isWaterSoluble, gas @ ${boilingPoint}C, solid @ ${meltingPoint}C, colors: ${colors.toString()}"
    }

}