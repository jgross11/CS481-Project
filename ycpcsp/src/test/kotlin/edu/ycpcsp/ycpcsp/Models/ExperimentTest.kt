package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class ExperimentTest {
    var Josh = Experiment("The Big Fun house","Josh", 1)
    var Adrian = Experiment("The Tiny Fun house","Adrian", 100)
    var Dennis = Experiment("The Medium Fun house","Dennis", 10)

    @Test
    fun getCreator() {
        assertEquals("The Big Fun house", Josh.title)
        assertEquals("The Tiny Fun house",Adrian.title)
        assertEquals("The Medium Fun house",Dennis.title)
    }

    @Test
    fun getTitle(){
        assertEquals("Josh", Josh.creatorName)
        assertEquals("Adrian",Adrian.creatorName)
        assertEquals("Dennis",Dennis.creatorName)
    }


}