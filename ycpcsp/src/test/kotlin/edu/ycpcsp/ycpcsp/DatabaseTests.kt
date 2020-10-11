package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.LoadUser
import edu.ycpcsp.ycpcsp.DataBase.VerifyUser
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class DatabaseTests {

    @Test
    fun testVerifyUsers() {
        //test email/username
        val email = "test@test.com"
        //test password
        val userPassword = "1234"
        assertTrue(VerifyUser(email, userPassword))
    }
    @Test
    fun testLoadUser(){
        //test email/username
        val email = "test@test.com"
        LoadUser(email)
    }

}