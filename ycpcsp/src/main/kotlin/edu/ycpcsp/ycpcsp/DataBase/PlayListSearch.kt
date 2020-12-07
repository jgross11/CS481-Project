package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.PlayList
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun PlaylistSearch(userId: Int) : ArrayList<PlayList> {
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
        val query = "Select * from Database.Playlist where user_ID = ? "
        val ps = conn.prepareStatement(query)
        ps.setInt(1, userId)
        val rs = ps.executeQuery()

        //make string list to store the names in
        val RecentExperiments = arrayListOf<PlayList>()

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        //go to first value and start putting the names of the experiments in the list
        rs.next()
        var contains = true


        for (x in 1..rs.fetchSize) {

            var WhatIsGoing = PlayList(rs.getInt("user_ID"), rs.getString("Playlist_Name"), rs.getInt("Playlist_ID"))

            WhatIsGoing.entries = PlaylistExperimentSearch(rs.getInt("Playlist_ID"))
            //TODO got to find a way to bring some Experiments here today getlist of experimentsID that need to be grabbed and then grab their other stuff

            RecentExperiments.add(WhatIsGoing)
            rs.next()
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

