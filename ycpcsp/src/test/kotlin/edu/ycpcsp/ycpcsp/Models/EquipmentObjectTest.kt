package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class EquipmentObjectTest {
    var BunsunBurner = EquipmentObject(1, 3)
    var EquipmentPiece = EquipmentObject(4, 65)

    @Test
    fun getObjectID() {
        assertEquals(1, BunsunBurner.objectID)
        assertEquals(4, EquipmentPiece.objectID)
    }

    @Test
    fun getAmount(){
        assertEquals(3, BunsunBurner.amount)
        assertEquals(65, EquipmentPiece.amount)
    }

}