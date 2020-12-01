package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that represents a piece of equipment in experiment
 *  objectID: the DB ID of this piece of equipment
 *  amount: the number of instances needed of this piece of equipment
 */


data class EquipmentObject(
        var objectID  : Int,
        var amount : Int
) {


    override fun toString(): String {
        return "Equipment: objectID=$objectID | amount=$amount"
    }
}