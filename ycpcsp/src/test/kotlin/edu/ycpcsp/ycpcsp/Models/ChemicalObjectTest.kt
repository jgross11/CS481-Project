package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class ChemicalObjectTest {
    var ChemicalXId = 2
    var ChemicalXMass = 2.0
    var ChemicalXConcentration = 12.0
    var Chemicalx = ChemicalObject(ChemicalXId, ChemicalXMass, ChemicalXConcentration)

    var ChemicalYId = 4
    var ChemicalYMass = 2.0
    var ChemicalYConcentration = 7.0
    var ChemicalY = ChemicalObject(ChemicalYId, ChemicalYMass, ChemicalYConcentration)
    @Test
    fun getId() {
        assertEquals(ChemicalXId, Chemicalx.id)
        assertEquals(ChemicalYId, ChemicalY.id)
    }

    @Test
    fun getMass(){
        assertEquals(ChemicalXMass, Chemicalx.mass)
        assertEquals(ChemicalYMass, ChemicalY.mass)
    }

    @Test
    fun getConcentration(){
        assertEquals(ChemicalYConcentration, ChemicalY.concentration)
        assertEquals(ChemicalXConcentration, Chemicalx.concentration)
        println("Unit is running ")
    }


















}