package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun IsEmailInDB(email : String) : Boolean{
    var connection = getDBConnection()

    try {
        if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT email FROM Database.Users WHERE email = ?")
            preparedSt.setString(1, email)
            val rs = preparedSt.executeQuery()

            try {
                return rs.first()
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
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

fun isEmailInQuarantineDB(email : String) : Boolean{
    val connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT quID FROM Database.Quarantine_Users WHERE email = ?;")
            preparedStatement.setString(1, email)
            val rs = preparedStatement.executeQuery()
            return rs.first()

        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false;
}