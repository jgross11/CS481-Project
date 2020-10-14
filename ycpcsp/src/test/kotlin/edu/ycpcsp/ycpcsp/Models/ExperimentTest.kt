package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class ExperimentTest {
    var Josh = Experiment("The Big Fun house","Josh")
    var Adrian = Experiment("The Tiny Fun house","Adrian")
    var Dennis = Experiment("The Medium Fun house","Dennis")

    @Test
    fun getCreator() {
        assertEquals("The Big Fun house", Josh.title)
        assertEquals("The Tiny Fun house",Adrian.title)
        assertEquals("The Medium Fun house",Dennis.title)
    }

    @Test
    fun getTitle(){
        assertEquals("Josh", Josh.creatorName)
        assertEquals("Adrian",Josh.creatorName)
        assertEquals("Dennis",Josh.creatorName)
    }


}