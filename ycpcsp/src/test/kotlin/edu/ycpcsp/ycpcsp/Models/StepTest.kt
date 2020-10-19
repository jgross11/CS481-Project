package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class StepTest {

    var testStep = Step(0, 1, true, 1, false, 3)

    @Test
    fun testGetStepNumber() {
        assertEquals(0, testStep.stepNumber)
    }

    @Test
    fun testGetActorIndex(){
        assertEquals(1, testStep.actorIndex)
    }

    @Test
    fun testGetActorId(){
        assertEquals(true, testStep.actorID)
    }

    @Test
    fun testGetReceiverIndex(){
        assertEquals(1, testStep.receiverIndex)
    }

    @Test
    fun testGetReceiverId(){
        assertEquals(false, testStep.receiverID)
    }

    @Test
    fun testGetFunctionId(){
        assertEquals(3, testStep.functionID)
    }

}