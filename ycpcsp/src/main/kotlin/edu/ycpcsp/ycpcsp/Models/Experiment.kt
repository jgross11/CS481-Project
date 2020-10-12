package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents an experiment
 *  Contains a name, the creator's name, and tags
 */
data class Experiment(

                    var title : String,
                    var CreatorName : String
                    )

{
    var equipment : Array<EquipmentObject> = arrayOf<EquipmentObject>()
    var chemicals : Array<ChemicalObject> = arrayOf<ChemicalObject>()
    var steps : Array<Step> = arrayOf<Step>()

    fun addStep(step : Step, index : Int){
        steps[index] = step
    }

    // null constructor
    constructor() : this("NULL", "NULL"){

    }

    override fun toString(): String {
        var result = "$title, made by\n"
        for(step in steps){
            result += "$step.toString()"
        }
        return result
    }
}