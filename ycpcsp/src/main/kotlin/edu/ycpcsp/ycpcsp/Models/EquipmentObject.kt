package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents a piece of equipment in experiment
 *  Contains: name, inherited from ExperimentObject
 */

data class EquipmentObject(var _name : String) : ExperimentObject(_name) {

    override fun toString(): String {
        return name
    }
}