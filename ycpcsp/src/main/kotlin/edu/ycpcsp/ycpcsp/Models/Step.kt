package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that contains information about a step in an experiment
 *  Includes: step number, actor object, and receiver object
 */

data class Step( var id : Short,
                 var actor : ExperimentObject,
                 var receiver : ExperimentObject
                )
{
    override fun toString() : String{
        return "\nStep $id\n${actor.toString()}\nacts on\n${receiver.toString()}\n"
    }
}