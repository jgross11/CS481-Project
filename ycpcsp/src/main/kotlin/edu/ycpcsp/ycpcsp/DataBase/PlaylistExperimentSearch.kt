package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.DataBase.serverCredential
import edu.ycpcsp.ycpcsp.Models.PlayList
import edu.ycpcsp.ycpcsp.Models.PlaylistObject
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun PlaylistExperimentSearch(Playlist_ID: Int) : ArrayList<PlaylistObject> {
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
        println(Playlist_ID)
        val query = "SELECT s.ExperimentsID, s.creatorID, s.title, u.firstName, u.lastName FROM Playlist_Experiments p INNER JOIN Experiments s ON s.ExperimentsID = p.Experiment_ID inner join Users u on u.UserID = s.creatorID WHERE p.Playlist_Id = ? "
        val ps = conn.prepareStatement(query)
        ps.setInt(1, Playlist_ID)
        val rs = ps.executeQuery()

        //make string list to store the names in
        val RecentExperiments = ArrayList<PlaylistObject>()

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        //go to first value and start putting the names of the experiments in the list
        rs.next()


        for (x in 1..rs.fetchSize) {

            var WhatIsGoing = PlaylistObject(rs.getInt(rs.getInt("ExperimentsID")), rs.getInt("creatorID"), rs.getString("title"), rs.getString("firstName"), rs.getString("lastName"))
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