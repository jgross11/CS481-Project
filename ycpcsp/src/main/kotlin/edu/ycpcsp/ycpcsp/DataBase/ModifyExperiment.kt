package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*
import java.sql.Statement
import kotlin.math.exp

fun ModifyExperiment(experiment: Experiment): Boolean {

    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    edu.ycpcsp.ycpcsp.DataBase.password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()

        //Edit Experiment table, delete later?
        //Need to modify all experiment id
        st.executeUpdate("UPDATE Database.Experiments" +
                            "SET title = '${experiment.title}', numSteps = '$experiment.numSteps'" +
                            "WHERE ExperimentsID = '$experiment.id';")

        //Edit Chemistry table
        for(chemical in experiment.chemicals){
            st.executeUpdate("UPDATE Database.Chemicals" +
                    "SET type_id = '${chemical.id}', mass = '${chemical.mass}', concentration = '${chemical.concentration}'" +
                    "WHERE experiment_ID = '$experiment.id';")
        }


        //Edit Equipment table
        for(equipment in experiment.equipment){
            st.executeUpdate("UPDATE Database.Equipments" +
                    "SET object_ID = '${equipment.objectID}', amount = '${equipment.amount}'" +
                    "WHERE experiment_ID = '$experiment.id';")
        }

        //edit Steps table
        for(steps in experiment.steps){
            st.executeUpdate("UPDATE Database.Steps" +
                    "SET step_number = '${steps.stepNumber}', actor_index = '${steps.actorIndex}', actor_ID = '${steps.actorID}', receiver_index = '${steps.receiverIndex}', receiver_ID = '${steps.receiverID}', functionID = '${steps.functionID}'" +
                    "WHERE experiment_ID = '$experiment.id';")
        }

        return true

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