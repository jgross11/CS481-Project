package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*


fun createExperiment(experiment: Experiment): Boolean {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()


        try{
            //Model classes have not been updated, so the execute will not work
            var rs = st.executeUpdate("INSERT INTO Database.Experiments (title, creatorID, tags)\n" +
                    "VALUES (\'${experiment.title}\', , 0101)")
            for (name in experiment.steps) {
                rs = st.executeUpdate("INSERT INTO Database.Steps (experiment_ID, step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID)\n" +
                        "VALUES ( , 2, 0, 1, 3, 1, 3)")
            }
            //if the updates work this method will return false
            return true
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }

        //This means the query failed to find anything
        return false
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //This means that the result was not the same
    return false
}

