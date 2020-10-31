package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*


fun verifySecurityQuestion(email: String, securityQuestion: SecurityQuestion): Boolean {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT ans? FROM Database.Users where email = ?;")
            preparedSt.setInt(1, securityQuestion.questionIndex)
            preparedSt.setString(2, email)
            val rs = preparedSt.executeQuery()

            try {
                rs.next()
                return rs.getString(1).compareTo(securityQuestion.answer) == 0
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            return false
        }

        //This means the query failed to find anything
        return false
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //This means that the result was not the same
    return false
}