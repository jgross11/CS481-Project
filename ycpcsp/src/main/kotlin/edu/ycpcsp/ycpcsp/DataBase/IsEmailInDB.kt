package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun IsEmailInDB(email : String) : Boolean{
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        Class.forName("com.mysql.jdbc.Driver")
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT email FROM Database.Users WHERE email = \"$email\"")

        try{
            return rs.first()
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }
        return true

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