package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun ModifyUser(user: User): Boolean {
    var connection = getDBConnection()

    try {
        if(connection != null) {

            try {
                var preparedSt = connection.prepareStatement("update Database.Users " +
                        "SET firstName = ?, lastName = ?, password = ?, organization = ? " +
                        "WHERE email = ?;")
                preparedSt.setString(1, user.firstName)
                preparedSt.setString(2, user.lastName)
                preparedSt.setString(3, user.password)
                preparedSt.setString(4, user.school)
                preparedSt.setString(5, user.email)

                preparedSt.executeUpdate()
                //The method will return true if the query was able to successful update the desired User row
                return true
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            //The method will return false if the query was unsuccessful

            return false
        }
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //return false if the query was not successful
    return false
}