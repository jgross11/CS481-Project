package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun PlaylistSearch(userId: Int) : ArrayList<String> {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        //Experiment Search Query
        println(userId)
        val query = "Select * from Database.Playlist where user_ID = \"$userId\"; "
        val ps = conn.prepareStatement(query)
        val rs = ps.executeQuery()

        //make string list to store the names in
        val RecentExperiments = arrayListOf<String>()

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        //go to first value and start putting the names of the experiments in the list
        rs.next()
        var contains = true


        for (x in 1..rs.fetchSize) {
           if(!RecentExperiments.contains(rs.getString("Playlist_Name"))){
               RecentExperiments.add(rs.getString("Playlist_Name"))
           }

        }

        //return the names mutable list
        return RecentExperiments

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    //If you get here then there was a failure so return empty array
    return arrayListOf()
}

fun PlaylistSearchTwo(userId: Int): String {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            val preparedSt = connection.prepareStatement("SELECT * FROM Database.Playlist;")
            preparedSt.setInt(1, userId)
            val rs = preparedSt.executeQuery()

            try {
                return if (rs.first()) {
                    println("the return if gave me somethin")
                    rs.getString("Playlist_Name")

                } else {
                    println("the else gave me somethin")
                    rs.getString("Playlist_Name")

                }
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            return rs.getString("Playlist_Name")
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return "didnt make it"
}