package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun UserSignup(signupFormData: SignupFormData): Boolean {
    val connection = getDBConnection()
    try{
        if(connection != null) {
            //test the driver to make sure that it works
            var prepareSt = connection.prepareStatement("INSERT INTO Database.Users (firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3)" +
                    " VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
            prepareSt.setString(1, signupFormData.firstName)
            prepareSt.setString(2, signupFormData.lastName)
            prepareSt.setString(3, signupFormData.email)
            prepareSt.setString(4, signupFormData.password)
            prepareSt.setString(5, signupFormData.school)
            prepareSt.setInt(6, signupFormData.sq1)
            prepareSt.setInt(7, signupFormData.sq2)
            prepareSt.setInt(8, signupFormData.sq3)
            prepareSt.setString(9, signupFormData.sq1a)
            prepareSt.setString(10, signupFormData.sq2a)
            prepareSt.setString(11, signupFormData.sq3a)

            prepareSt.executeUpdate()
            return true
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return false
}