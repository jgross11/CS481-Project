package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*


fun verifySecurityQuestion(email: String, securityQuestion: SecurityQuestion): Boolean {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT ans"+securityQuestion.questionIndex+" FROM Database.Users where email = \"$email\";")

        try{
            rs.next()
            return rs.getString(1).compareTo(securityQuestion.answer) == 0
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }
        return false

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