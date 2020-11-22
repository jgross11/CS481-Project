package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that contains information about a step in an experiment
 *  Includes: step number, actor object, and receiver object
 */

data class Step( var stepNumber : Int,
                 var actorIndex : Int,
                 var actorID : Boolean,
                 var receiverIndex : Int,
                 var receiverID : Boolean,
                 var functionID : Int
                )
{
    override fun toString() : String{
        val actorString = if (actorID) "Equipment" else "Chemical"
        val receiverString = if (receiverID) "Equipment" else "Chemical"
        return "\nStep $stepNumber\n$actorString $actorIndex\nacts on\n$receiverString $receiverIndex\nWith functionID $functionID\n"
    }
}