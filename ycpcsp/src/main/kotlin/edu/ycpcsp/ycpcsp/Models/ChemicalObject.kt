package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents a chemical used in an experiment
 *  Contains id, quantity, and concentration
 */

data class ChemicalObject(
        var id : Int,
        var mass : Double,
        var concentration : Double
)

{
    override fun toString(): String {
        return "Experiment chemical: id=$id, quantity=$mass, concentration=$concentration"
    }
}