package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.SearchObject
import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun SearchExperiment(searchCriteria: SearchFormData) : Array<SearchObject> {
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
        val query = "Select Distinct ExperimentsID, title, firstName, lastName from Database.Experiments join Database.Users on Database.Experiments.creatorID = Database.Users.UserID where title like ?"
        val ps = conn.prepareStatement(query)
        ps.setString(1, "%$searchCriteria%")
        val rs = ps.executeQuery()

        //make string list to store the names in

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        val ExperimentValues = Array<SearchObject>(rs.fetchSize) { SearchObject(0, "","" ) }

        //go to first value and start putting the names of the experiments in the list
        rs.next()
        for (x in 1..rs.fetchSize) {
            val id = rs.getInt("ExperimentsID")
            val title = rs.getString("title")
            val creatorName = rs.getString("firstName") + " " + rs.getString("lastName")
            ExperimentValues[x-1] = SearchObject(id, title, creatorName)
            rs.next()
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