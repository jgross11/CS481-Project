package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun DeleteUser(id: String?): Boolean{
    val connection = getDBConnection()
    if(connection != null) {
        try {
            val preparedSt = connection.prepareStatement("DELETE FROM Database.Users WHERE id = ?")

            preparedSt.setString(1, id)
            preparedSt.executeUpdate()

            return true

        } catch (ex: SQLException) {
            // handle any errors
            ex.printStackTrace()
        } catch (ex: Exception) {
            // handle any errors
            ex.printStackTrace()
        }


    }
    return false
}
