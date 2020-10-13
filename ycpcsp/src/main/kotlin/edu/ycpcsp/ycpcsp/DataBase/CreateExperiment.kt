package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*


fun CreateExperiment(experiment: Experiment, user: User): Boolean {
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


        try{
            //Model classes have not been updated, so the execute will not work
            var rs = st.executeUpdate("INSERT INTO Database.Experiments (title, creatorID, tags)\n" +
                    "VALUES (\'${experiment.title}\', ${user.userID}, 0101)")
            val exRs = st.executeQuery("SELECT ExperimentsID FROM Database.Experiments where title = \'${experiment.title}\' AND creatorID = "+user.userID+";")
            try {
                exRs.next()
                val experimentID = exRs.getInt(1)

                //This loop will add in all the new Equipment
                //TODO Equipments "name" is an Int when it should be String
                for (name in experiment.equipment) {
                    rs = st.executeUpdate("INSERT INTO Database.Equipments (experiment_ID, name, object_ID, amount)\n" +
                            "VALUES ( $experimentID, ${name.name}, ${name.object_ID}, ${name.amount})")
                }

                //This lop will add in all the new Chemicals
                //TODO Chemical quantity and concentration are floats when Zack wrote them as doubles
                for (name in experiment.chemicals) {
                    rs = st.executeUpdate("INSERT INTO Database.Chemicals (experiment_ID, type_id, mass, concentration)\n" +
                            "VALUES ( $experimentID, ${name.type_id}, ${name.quantity}, ${name.concentration})")
                }

                //This loop will insert in all the new steps
                //Remember that actor & receiver IDs are bits
                for (name in experiment.steps) {
                    rs = st.executeUpdate("INSERT INTO Database.Steps (experiment_ID, step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID)\n" +
                            "VALUES ( $experimentID}, ${name.step_number}, ${name.actor_index}, ${name.actor_ID}, ${name.receiver_index}, ${name.receiver_ID}, ${name.function_ID})")
                }
            } catch (ex: SQLException){
                println("The code entering the Experiment is broken. Fix the Insert or Select ExperimentsID query")
                ex.printStackTrace()
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


