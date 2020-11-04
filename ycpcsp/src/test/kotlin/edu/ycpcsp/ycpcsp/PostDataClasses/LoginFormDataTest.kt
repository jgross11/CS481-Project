package edu.ycpcsp.ycpcsp.PostDataClasses

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class LoginFormDataTest {

    var testForm = LoginFormData("jgross11@ycp.edu", "eBe43A392BF4")
    @Test
    fun testToString() {
        assertEquals(testForm.toString(), "jgross11@ycp.edu | eBe43A392BF4")
    }

    @Test
    fun getEmail() {
        assertEquals(testForm.email, "jgross11@ycp.edu")
    }

    @Test
    fun getPassword() {
        assertEquals(testForm.password, "eBe43A392BF4")
    }

}