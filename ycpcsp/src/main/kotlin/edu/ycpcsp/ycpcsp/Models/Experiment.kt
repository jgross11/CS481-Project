package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents an experiment
 *  Contains a name, the creator's name, and tags
 */
data class Experiment(
                    var title : String,
                    var creatorName : String,
                    var experimentID : Int
                    )
{
    var equipment : Array<EquipmentObject> = arrayOf<EquipmentObject>()
    var chemicals : Array<ChemicalObject> = arrayOf<ChemicalObject>()
    var steps : Array<Step> = arrayOf<Step>()
    var chemicalProperties : Array<ChemicalProperties> = arrayOf<ChemicalProperties>()
    var equations : Array<ChemicalEquation> = arrayOf<ChemicalEquation>()

    fun addStep(step : Step, index : Int){
        steps[index] = step
    }

    // null constructor
    constructor() : this("", "", -1){

    }

    fun setEquipmentListSize(size : Int){
        equipment = Array(size){ EquipmentObject(-1, -1) }
    }
    fun setChemicalListSize(size : Int){
        chemicals = Array(size){ ChemicalObject(-1, -1.0, -1.0) }
    }
    fun setStepListSize(size : Int){
        steps = Array(size){Step(-1, -1, false, -1, false, -1)}
    }
    fun setChemicalInformationsListSize(size : Int){
        chemicalProperties = Array(size){ChemicalProperties()}
    }
    fun setEquationListSize(size : Int){
        equations = Array(size){ ChemicalEquation() }
    }

    override fun toString(): String {
        var result = "$title, made by $creatorName\n"
        result += "equipment:\n"
        for(equip in equipment){
            result += equip.toString()
            result += "\n"
        }
        result += "chemical:\n"
        for(chem in chemicals){
            result += chem.toString()
            result += "\n"
        }
        result += "steps:\n"
        for(step in steps){
            result += "$step"
        }
        result += "chemical informations:\n"
        for(ci in chemicalProperties){
            result += "${ci.toString()}\n"
        }
        result += "equations:\n"
        for(eq in equations){
            result += "${eq.toString()}\n"
        }
        return result
    }
}