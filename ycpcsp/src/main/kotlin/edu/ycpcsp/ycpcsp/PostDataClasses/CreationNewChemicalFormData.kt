package edu.ycpcsp.ycpcsp.PostDataClasses

class CreationNewChemicalFormData (
                      var ChemicalName : String,
                      var ChemicalFormula : String,
                      var ChemicalMass : Double,
                      var ChemicalDensity  : Double,
                      var ChemicalWaterSoluable : Boolean,
                      var ChemicalPhaseChangeSolid: Double,
                      var ChemicalPhaseChangeLiquid : Double,
                      var ChemicalGasColor: Int,
                      var ChemicalSolidColor : Int,
                      var ChemicalLiquidColor: Int



){
    override fun toString(): String {
        return "$ChemicalName $ChemicalFormula | $ChemicalMass\n$ChemicalDensity, $ChemicalWaterSoluable\n$ChemicalPhaseChangeSolid: $ChemicalPhaseChangeLiquid\n"
    }
}