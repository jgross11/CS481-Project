package edu.ycpcsp.ycpcsp

import  java.util.Properties
import java.sql.*

fun main() {
    val connectionProps = Properties()
    val username = "admin"
    val password = "ruRkob-6zoqvu-nywryf"
    val url = "jdbc:mysql://cs481database.c4fmzwru5eoe.us-east-2.rds.amazonaws.com:3306/Database"   // Had to make it say /Database so that it actually works
    connectionProps.put("user", username)
    connectionProps.put("password", password)
    connectionProps.put("useSSL", "false")

    try {
        Class.forName("com.mysql.jdbc.Driver");

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement();


        // edited this file to test the execute Query function on the database
        var rs = st.executeUpdate("create table TEST( TestID int)")

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
}