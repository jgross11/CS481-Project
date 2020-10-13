package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */

@JsonTypeName("chemical")

data class ChemicalObject(
                        var typeId : Int,
                        var quantity : Float,
                        var concentration : Float
                        )
{
    override fun toString(): String {
        return "$typeId: quantity=$quantity, concentration=$concentration"
    }
}