package edu.ycpcsp.ycpcsp.DataBase


import edu.ycpcsp.ycpcsp.Models.SearchObject
import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun SearchPlaylist(searchCriteria: SearchFormData) : Array<SearchObject> {
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
        val query = "Select Distinct Playlist_ID, Playlist_Name, firstName, lastName from Database.Playlist join Database.Users on Database.Playlist.user_ID = Database.Users.UserID where Playlist_Name like ?"
        val ps = conn.prepareStatement(query)
        ps.setString(1, "%$searchCriteria%")
        val rs = ps.executeQuery()

        //make string list to store the names in

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        //create an empty array of search objects for the search query to store into
        val ExperimentValues = Array<SearchObject>(rs.fetchSize) { SearchObject(0, "","" ) }

        //go to first value and start putting the names of the experiments in the list
        rs.next()
        for (x in 1..rs.fetchSize) {
            val id = rs.getInt("Playlist_ID") // get the id of the experiment
            val title = rs.getString("Playlist_Name")   // get the title of the experiment
            val creatorName = rs.getString("firstName") + " " + rs.getString("lastName")    // get the first name and the last name of the experiment creator and store it into one value
            ExperimentValues[x-1] = SearchObject(id, title, creatorName) // store the new search object into the array
            rs.next()   // iterate forward one search result
        }

        //return the names mutable list
        return ExperimentValues

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    //If you get here then there was a failure so return empty array
    return Array<SearchObject>(0) { SearchObject(0 ,"", "") }
}