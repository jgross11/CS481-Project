package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun loadUser(email: String): MutableList<String> {
    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"
    var userEntries : MutableList<String> = mutableListOf()

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT firstName, lastName, organization FROM Database.Users where email = \"$email\";")

        //for now I will keep the nested while loop just to see example code
        //but i need to simplify later on
        // for each row in the result set
        val rsmd = rs.metaData
        val colmnNum = rsmd.columnCount

        while (rs.next()) {
            //prints out values in each column of the result set
            for(i in 1  until colmnNum+1){
                //will print out every entry of the columns for one row
                //println(rs.getString(i))
                //adds strings into an array
                userEntries.add(rs.getString(i))
            }
        }
        return userEntries
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return userEntries
}
