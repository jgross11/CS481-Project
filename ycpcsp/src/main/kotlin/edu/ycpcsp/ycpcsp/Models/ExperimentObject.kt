package edu.ycpcsp.ycpcsp.Models

/**
 *  Superclass that contains information about an object in the experiment
 *  Includes: name
 */
abstract class ExperimentObject (var name : String)
{

    constructor(name : Object) : this(name as String){

    }

    abstract override fun toString(): String
}
