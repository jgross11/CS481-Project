package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */

@JsonTypeName("chemical")

data class ChemicalObject(
                        var type_id : Int,
                        var quantity : Float,
                        var concentration : Float
                        ) : ExperimentObject(type_id)
{
    override fun toString(): String {
        return "$name: quantity=$quantity, concentration=$concentration"
    }
}