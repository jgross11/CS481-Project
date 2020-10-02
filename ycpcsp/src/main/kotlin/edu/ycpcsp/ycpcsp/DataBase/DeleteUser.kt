package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun DeleteUser(id: String?){
    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = edu.ycpcsp.ycpcsp.DataBase.password
    connectionProps["useSSL"] = "false"

    try {
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeUpdate("DELETE FROM Database.Users WHERE id = '"+id+"'")
x
    }catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
}
