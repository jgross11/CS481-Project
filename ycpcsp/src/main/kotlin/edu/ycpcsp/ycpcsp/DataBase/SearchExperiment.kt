package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun SearchExperiment(searchCriteria: SearchFormData) : MutableList<String> {
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
        val query = "Select title from Database.Experiments where title like ?"
        val ps = conn.prepareStatement(query)
        ps.setString(1, "%$searchCriteria%")
        val rs = ps.executeQuery()

        //make string list to store the names in
        val names: MutableList<String> = arrayListOf()

        //find the fetch size by going to end
        rs.last()
        val num = rs.row
        rs.beforeFirst()
        rs.fetchSize = num

        //go to first value and start putting the names of the experiments in the list
        rs.next()
        for (x in 1..rs.fetchSize) {
            val name = rs.getString("title")
            names.add(name)
        }

        //return the names mutable list
        return names

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