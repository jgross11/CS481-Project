package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.verifyUser
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest

@SpringBootTest
class DatabaseTests {

    @Test
    fun thingsShouldWork() {
        //test email/username
        val email = "test@test.com"
        //test password
        val userPassword = "1234"
        assertTrue(verifyUser(email, userPassword))
    }

}
