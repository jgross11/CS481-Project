package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

//the class as a method is currently not working
fun verifyUser(email: String, userPassword: String): Boolean {
//    val serverCredentials = serverCredential()
//    val username = serverCredentials?.get(0)
//    val password = serverCredentials?.get(1)
//    val url = serverCredentials?.get(2)
    val username = "admin"
    val password = "ruRkob-6zoqvu-nywryf"
    val url = "jdbc:mysql://cs481database.c4fmzwru5eoe.us-east-2.rds.amazonaws.com:3306/Database"

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT password FROM Database.Users WHERE email = \"$email\";")

        rs.next()
       return rs.getString(1).compareTo(userPassword) == 0

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //returns false if there is no
    return false
}
