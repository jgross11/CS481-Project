package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */

@JsonTypeName("chemical")

data class ChemicalObject(
        var id : Int,
        var mass : Double,
        var concentration : Double
)

{
    override fun toString(): String {
        return "$id: quantity=$mass, concentration=$concentration"
    }
}