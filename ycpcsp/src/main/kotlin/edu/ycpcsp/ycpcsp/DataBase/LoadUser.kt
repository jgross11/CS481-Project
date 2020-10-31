
package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*

//enum class UserFields {FirstName, LastName, Email, Password, School}
var ID = 1
var FirstName = 2
var LastName = 3
var Email = 4
var Password = 5
var School = 6

fun LoadUser(email: String): User {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            val preparedSt = connection.prepareStatement("SELECT * FROM Database.Users where email = ?;")
            preparedSt.setString(1, email)
            val rs = preparedSt.executeQuery()

            try {
                return if (rs.first()) {
                    User(rs.getString(FirstName), rs.getString(LastName), rs.getString(Email), rs.getString(Password), rs.getString(School), rs.getInt(ID))
                } else {
                    User()
                }
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            return User()
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return User()
}