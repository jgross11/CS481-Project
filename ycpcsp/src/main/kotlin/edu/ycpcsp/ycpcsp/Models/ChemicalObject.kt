package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */
data class ChemicalObject(
                        var _name : String,
                        var quantity : Float,
                        var concentration : Float
                        ) : ExperimentObject(_name)
{
    override fun toString(): String {
        return "$name: quantity=$quantity, concentration=$concentration"
    }
}