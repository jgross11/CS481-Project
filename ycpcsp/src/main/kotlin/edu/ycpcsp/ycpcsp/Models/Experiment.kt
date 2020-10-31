package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents an experiment
 *  Contains a name, the creator's name, and tags
 */
data class Experiment(
                    var title : String,
                    var creatorName : String
                    )
{
    var equipment : Array<EquipmentObject> = arrayOf<EquipmentObject>()
    var chemicals : Array<ChemicalObject> = arrayOf<ChemicalObject>()
    var steps : Array<Step> = arrayOf<Step>()

    fun addStep(step : Step, index : Int){
        steps[index] = step
    }

    // null constructor
    constructor() : this("", ""){

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

    override fun toString(): String {
        var result = "$title, made by\n"
        for(step in steps){
            result += "$step"
        }
        return result
    }
}