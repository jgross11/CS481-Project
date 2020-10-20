package edu.ycpcsp.ycpcsp.PostDataClasses

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class ForgotEmailFormDataTest {

    var testForm = ForgotEmailFormData("Josh", "Gross")

    @Test
    fun testToString() {
        assertEquals(testForm.toString(), "Josh Gross")
    }

    @Test
    fun testGetFirstName() {
        assertEquals(testForm.firstName, "Josh")
    }

    @Test
    fun testGetLastName() {
        assertEquals(testForm.lastName, "Gross")
    }
}