package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that contains information about a step in an experiment
 *  Includes: step number, actor object, and receiver object
 */

data class Step( var step_number : Int,
                 var actor_index : Int,
                 var actor_ID : Boolean,
                 var receiver_index : Int,
                 var receiver_ID : Boolean,
                 var function_ID : Int
                )
{
    override fun toString() : String{
        return "\nStep $step_number\n${actor_index.toString()}\nacts on\n${receiver_index.toString()}\n"
    }
}