package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.loadUser
import edu.ycpcsp.ycpcsp.DataBase.verifyUser
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test

class DatabaseTests {

    @Test
    fun testVerifyUsers() {
        //test email/username
        val email = "test@test.com"
        //test password
        val userPassword = "1234"
        assertTrue(verifyUser(email, userPassword))
    }
    @Test
    fun testLoadUser(){
        //test email/username
        val email = "test@test.com"
        loadUser(email)
    }

}