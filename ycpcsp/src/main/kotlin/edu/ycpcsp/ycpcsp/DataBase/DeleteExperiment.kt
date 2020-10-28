package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun DeleteExperiment(experimentId: String) : Boolean {
    //experimentId, front end needs to somehow know what the experiments Id is
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        //The database has the foreign keys set up so that once the "master" foreign key is deleted the rest
        //will be cascaded down and delete all instances where that foreign key was inserted
        //Steps currently has no foreign key so i'll have to edit that later
        st.executeUpdate("DELETE FROM Database.Experiments WHERE ExperimentsID = '$experimentId'")
        st.executeUpdate("DELETE FROM Database.Steps WHERE experiment_ID = '$experimentId'")

        return true

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return false
}