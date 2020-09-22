package edu.ycpcsp.ycpcsp.DataBase

import  java.util.Properties
import java.sql.*

fun main() {
    val connectionProps = Properties();
    var username = "username";
    var password = "password";
    var url = "jdbc:mysql://###HOSTNAME HERE###";
    connectionProps.put("user", username);
    connectionProps.put("password", password)
    connectionProps.put("useSSL", "false")

    try {
        Class.forName("com.mysql.jdbc.Driver");

        var conn = DriverManager.getConnection(url, connectionProps)
        var st = conn.createStatement();
        var rs = st.executeQuery("select * from Database.Users")
        // for each result
        while (rs.next()) {
            // will no longer work as we don't know the correct amount of columns
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
