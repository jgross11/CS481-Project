package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach

internal class ExperimentTest {
    var Josh = Experiment("The Big Fun house","Josh")
    var Adrian = Experiment("The Tiny Fun house","Adrian")
    var Dennis = Experiment("The Medium Fun house","Dennis")
    var water = ChemicalObject(101, 1.0, 0.0)
    var beaker = EquipmentObject(0, 0)
    var waterInBeakerStep = Step(1, 0, true, 0, false, 0)


    @BeforeEach
    fun setup(){
        Josh.setEquipmentListSize(1)
        Josh.setChemicalListSize(1)
        Josh.setStepListSize(1)
        Josh.equipment[0] = beaker
        Josh.chemicals[0] = water
        Josh.steps[0] = waterInBeakerStep
    }

    @Test
    fun testGetCreator() {
        assertEquals("The Big Fun house", Josh.title)
        assertEquals("The Tiny Fun house",Adrian.title)
        assertEquals("The Medium Fun house",Dennis.title)
    }

    @Test
    fun testEquipment(){
        assertEquals(Josh.equipment.size, 1)
        assertEquals(Josh.equipment[0], beaker)
    }

    @Test
    fun testChemicals(){
        assertEquals(Josh.chemicals.size, 1)
        assertEquals(Josh.chemicals[0], water)
    }

    @Test
    fun testSteps(){
        assertEquals(Josh.steps.size, 1)
        assertEquals(Josh.steps[0], waterInBeakerStep)
    }

    @Test
    fun testGetTitle(){
        assertEquals("Josh", Josh.creatorName)
        assertEquals("Adrian",Adrian.creatorName)
        assertEquals("Dennis",Dennis.creatorName)
    }


}