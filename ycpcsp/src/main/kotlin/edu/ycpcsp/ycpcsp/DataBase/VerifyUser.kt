package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


//the class as a method is currently not working
fun VerifyUser(loginFormData: LoginFormData): Boolean {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT password FROM Database.Users WHERE email = ?;")
            preparedSt.setString(1, loginFormData.email)
            val rs = preparedSt.executeQuery()

            return if (!rs.first()) {
                println("email not in DB")
                false;
            } else {
                println("email in DB, returning password comparison")
                rs.getString(1).compareTo(loginFormData.password) == 0
            }
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //this false statement is just so the program stops getting angry with me
    return false
}

fun verifyQuarantineUser(loginFormData: LoginFormData) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT quID FROM Database.Quarantine_Users WHERE email = ? and password = ?")
            preparedStatement.setString(1, loginFormData.email)
            preparedStatement.setString(2, loginFormData.password)
            val rs = preparedStatement.executeQuery()
            return rs.first()

        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}
