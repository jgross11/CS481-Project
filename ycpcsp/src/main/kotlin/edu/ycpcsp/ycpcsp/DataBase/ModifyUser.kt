package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun ModifyUser(editUserFormData: EditUserFormData): Boolean {
    var connection = getDBConnection()

    try {
        if(connection != null) {

            try {
                var preparedSt = connection.prepareStatement("update Database.Users " +
                        "SET firstName = ?, lastName = ?, password = ?, organization = ? " +
                        "WHERE email = ?;")
                preparedSt.setString(1, editUserFormData.firstName)
                preparedSt.setString(2, editUserFormData.lastName)
                preparedSt.setString(3, editUserFormData.password)
                preparedSt.setString(4, editUserFormData.school)
                preparedSt.setString(5, editUserFormData.email)
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