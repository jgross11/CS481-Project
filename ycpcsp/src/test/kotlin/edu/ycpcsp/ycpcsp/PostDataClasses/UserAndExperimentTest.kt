package edu.ycpcsp.ycpcsp.PostDataClasses

import edu.ycpcsp.ycpcsp.Models.*
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class UserAndExperimentTest {
    var testUser = User("josh", "gross", "jgross11@ycp.edu", "123QWEasd", "YCP", 1)
    var testExperiment = Experiment("Water in Beaker","Josh Gross")
    var testUserAndExperiment = UserAndExperiment(testUser, testExperiment)

    @Test
    fun testGetUser() {
        assertEquals(testUserAndExperiment.user, testUser)
    }


    @Test
    fun testGetExperiment() {
        assertEquals(testUserAndExperiment.experiment, testExperiment)
    }
}