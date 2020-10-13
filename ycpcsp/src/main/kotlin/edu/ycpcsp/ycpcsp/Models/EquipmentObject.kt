package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a piece of equipment in experiment
 *  Contains: name, inherited from ExperimentObject
 */

@JsonTypeName("equipment")

data class EquipmentObject(
                        var name : Int,
                        var objectID  : Int,
                        var amount : Int
                        ) {

    override fun toString(): String {
        return "$name | $objectID | $amount"
    }
}