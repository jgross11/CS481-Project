package edu.ycpcsp.ycpcsp.PostDataClasses

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class SignupFormDataTest {

    var testForm = SignupFormData("Josh", "Gross", "jgross11@ycp.edu", "eBe43A392BF4", "YCP", 1, "Tippy", 2, "Three", 3, "Two")

    @Test
    fun testToString() {
        assertEquals(testForm.toString(), "Josh Gross | YCP\njgross11@ycp.edu, eBe43A392BF4\n1: Tippy\n2: Three\n3: Two")
    }

    @Test
    fun getFirstName() {
        assertEquals(testForm.firstName, "Josh")
    }

    @Test
    fun getLastName() {
        assertEquals(testForm.lastName, "Gross")
    }

    @Test
    fun getEmail() {
        assertEquals(testForm.email, "jgross11@ycp.edu")
    }

    @Test
    fun getPassword() {
        assertEquals(testForm.password, "eBe43A392BF4")
    }

    @Test
    fun getSchool() {
        assertEquals(testForm.school, "YCP")
    }

    @Test
    fun getSq1() {
        assertEquals(testForm.sq1, 1)
    }

    @Test
    fun getSq1a() {
        assertEquals(testForm.sq1a, "Tippy")
    }

    @Test
    fun getSq2() {
        assertEquals(testForm.sq2, 2)
    }

    @Test
    fun getSq2a() {
        assertEquals(testForm.sq2a, "Three")
    }

    @Test
    fun getSq3() {
        assertEquals(testForm.sq3, 3)
    }

    @Test
    fun getSq3a() {
        assertEquals(testForm.sq3a, "Two")
    }

}