package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*
import edu.ycpcsp.ycpcsp.PostDataClasses.UserAndExperiment
import java.sql.Statement

fun CreateExperiment(userAndExperiment: UserAndExperiment): Boolean {

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
            st.executeUpdate("INSERT INTO Database.Experiments (title, creatorID, tags)\n" +
                    "VALUES (\'${userAndExperiment.experiment.title}\', ${userAndExperiment.user.id}, 0101)", Statement.RETURN_GENERATED_KEYS)
            // should be the generated experiment ID
            var rs = st.generatedKeys
            var newExperimentKey = -1
            if(rs.next()){
                newExperimentKey = rs.getInt(1)
            }
            println(newExperimentKey)

            // insert steps
            for (step in userAndExperiment.experiment.steps) {
                st.executeUpdate("INSERT INTO Database.Steps (experiment_ID, step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID)\n" +
                        "VALUES ($newExperimentKey, ${step.stepNumber}, ${step.actorIndex}, ${step.actorID}, ${step.receiverIndex}, ${step.receiverID}, ${step.functionID})")
            }

            // TODO insert chemicals
            for(chemical in userAndExperiment.experiment.chemicals){
                st.executeUpdate("INSERT INTO Database.Chemicals (experiment_ID, type_id, mass, concentration)\n" +
                        "VALUES ($newExperimentKey, ${chemical.id}, ${chemical.mass}, ${chemical.concentration})")
            }
            // TODO insert equipment
            for(equipment in userAndExperiment.experiment.equipment){
                st.executeUpdate("INSERT INTO Database.Equipments (experiment_ID, name, object_ID, amount)\n" +
                        "VALUES ($newExperimentKey, \"why do we have this field\", ${equipment.objectID}, ${equipment.amount})")
            }
            // TODO ensure all queries actually execute and handle errors accordingly
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