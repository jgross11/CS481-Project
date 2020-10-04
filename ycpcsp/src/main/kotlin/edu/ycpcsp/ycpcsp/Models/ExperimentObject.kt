package edu.ycpcsp.ycpcsp.Models

/**
 *  Superclass that contains information about an object in the experiment
 *  Includes: name
 */
open class ExperimentObject (_name : String)
{
    var name : String = _name

    override fun toString(): String {
        return "ERROR: ExperimentObject.toString was called - you meant to call toString of the subclass. Fix that. "
    }
}
