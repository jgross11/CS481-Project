package edu.ycpcsp.ycpcsp.Models

import com.fasterxml.jackson.annotation.JsonTypeName

/**
 *  Class that represents a piece of equipment in experiment
 *  Contains: name, inherited from ExperimentObject
 */

@JsonTypeName("equipment")

data class EquipmentObject(
                        var _name : Int,
                        var object_ID  : Int,
                        var amount : Int
                        ) : ExperimentObject(_name) {

    override fun toString(): String {
        return "$name"
    }
}