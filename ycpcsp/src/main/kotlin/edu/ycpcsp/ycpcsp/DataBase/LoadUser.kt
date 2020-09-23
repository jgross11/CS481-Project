package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun LoadUser(email: String) {
    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT * FROM Database.Users WHERE email = \"$email\";")

        //for now I will keep the nested while loop just to see example code
        //but i need to simplify later on
        // for each row in the result set
        val rsmd = rs.metaData
        val colmnNum = rsmd.columnCount
        while (rs.next()) {
            //prints out values in each column of the result set
            for(i in 1  until colmnNum+1){
                //gotta figure out how this stuff works
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
