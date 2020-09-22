package edu.ycpcsp.ycpcsp

import  java.util.Properties
import java.sql.*

fun main() {
    val connectionProps = Properties()
    var username = "admin"
    var password = "ruRkob-6zoqvu-nywryf"
    var url = "jdbc:mysql://cs481database.c4fmzwru5eoe.us-east-2.rds.amazonaws.com:3306"
    connectionProps.put("user", username)
    connectionProps.put("password", password)
    connectionProps.put("useSSL", "false")

    try {
        Class.forName("com.mysql.jdbc.Driver");

        var conn = DriverManager.getConnection(url, connectionProps)
        var st = conn.createStatement();
        var rs = st.executeQuery("select * from Database.Users")
        // for each result
        while (rs.next()) {
            // for each property of each result
            println(rs.getString(1));
            println(rs.getString(2));
            println(rs.getString(3));
            println(rs.getString(4));
            println(rs.getString(5));
            println(rs.getString(6));
        }
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
}