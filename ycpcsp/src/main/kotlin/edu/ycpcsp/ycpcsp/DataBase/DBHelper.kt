package edu.ycpcsp.ycpcsp.DataBase

import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun getDBConnection() : Connection?{
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
        return DriverManager.getConnection(url, connectionProps)

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return null
}