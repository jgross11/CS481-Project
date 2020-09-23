package edu.ycpcsp.ycpcsp.DataBase

import java.util.Properties
import java.sql.*

const val username = "admin"
const val password = "ruRkob-6zoqvu-nywryf"
const val url = "jdbc:mysql://cs481database.c4fmzwru5eoe.us-east-2.rds.amazonaws.com:3306"


fun main() {
    val connectionProps = Properties();
    connectionProps.put("user", username)
    connectionProps.put("password", password)
    connectionProps.put("useSSL", "false")

    try {
        Class.forName("com.mysql.jdbc.Driver")

        var conn = DriverManager.getConnection(url, connectionProps)
        var st = conn.createStatement();
        var rs = st.executeQuery("select * from Database.Users")
        var rsmd = rs.metaData
        var colmnNum = rsmd.columnCount

        // for each row in the result set
        while (rs.next()) {
            //prints out values in each column of the result set
            for(i in 1  until colmnNum){
                println(rs.getString(i))
            }
            //For now I will differentiate rows like this
            println("\n Next Row \n")
        }
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
}
