package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

//apparently naming a const val keeps it global across kotlin classes?
const val username = "admin"
const val password = "ruRkob-6zoqvu-nywryf"
const val url = "jdbc:mysql://cs481database.c4fmzwru5eoe.us-east-2.rds.amazonaws.com:3306/Database"

//the class as a method is currently not working
fun verifyUser(email: String, userPassword: String): Boolean {
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
    //this false statement is just so the program stops getting angry with me
    return false
}
