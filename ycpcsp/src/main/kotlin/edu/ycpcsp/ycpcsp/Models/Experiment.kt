package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents an experiment
 *  Contains a name, the creator's name, and tags
 */
data class Experiment(
                    var name : String,
                    var creatorName : String,
                    var tags : String,
                    var numSteps : Int
                    )
{
    var steps : Array<Step>
    init{
        steps = Array<Step>(numSteps){Step(-1, ExperimentObject("NULL OBJECT"), ExperimentObject("NULL OBJECT"))}
        name = "\"$name\""
    }

    fun addStep(step : Step, index : Int){
        steps[index] = step
    }

    override fun toString(): String {
        var result = "$name, made by $creatorName, with tags: $tags\n"
        for(step in steps){
            result += "${step.toString()}"
        }
        return result
    }

}