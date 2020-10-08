package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a chemical used in an experiment
 *  Contains name (inherited from ExperimentObject), quantity, and concentration
 */

@JsonTypeName("chemical")

data class ChemicalObject(
                        var _name : Int,
                        var quantity : Float,
                        var concentration : Float
                        ) : ExperimentObject(_name)
{
    override fun toString(): String {
        return "$name: quantity=$quantity, concentration=$concentration"
    }
}