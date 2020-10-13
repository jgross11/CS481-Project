package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalObject
import edu.ycpcsp.ycpcsp.Models.EquipmentObject
import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.Step
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun LoadExperiment(id: String) : Experiment {
    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = edu.ycpcsp.ycpcsp.DataBase.password
    connectionProps["useSSL"] = "false"

    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()


        //Experiment Query
        var experiment = Experiment()

       //User query
        val rs = st.executeQuery("Select Distinct title, firstName, lastName from Database.Experiments join Database.Users on Database.Experiments.creatorID = Database.Users.UserID where ExperimentsID = \"$id\" ")
        rs.fetchSize = 2
        rs.next()
        val title = rs.getString("title")
        val creatorName = rs.getString("firstName") + " " + rs.getString("lastName")
        experiment.title = title
        experiment.CreatorName = creatorName


        //Equipment query
        val rs2 = st.executeQuery("Select Distinct name, object_ID from Database.Equipments join Database.Experiments on Database.Experiments.ExperimentsID = Database.Equipments.experiment_ID where ExperimentsID = \"$id\" ")
        rs2.last()
        val num = rs2.row
        rs2.beforeFirst()
        rs2.fetchSize = num
        while(rs2.next()) {
            for (x in 1..rs2.fetchSize) {
                val name = rs2.getString("name")
                val object_ID = rs2.getInt("object_ID")
                experiment.equipment.add(EquipmentObject(name, object_ID))
            }
        }

        //Chemical query
        val rs3 = st.executeQuery("Select type_id, mass, concentration from Database.Chemicals join Database.Experiments on Database.Experiments.ExperimentsID = Database.Chemicals.experiment_ID where experiment_ID = \"$id\" ")
        rs3.last()
        val num2 = rs3.row
        rs3.beforeFirst()
        rs3.fetchSize = num2
        rs3.next()
        for (x in 1..rs3.fetchSize) {
            val type_id = rs3.getInt("type_id")
            val quantity = rs3.getFloat("mass")
            val concentration = rs3.getFloat("concentration")
            experiment.chemicals.add(ChemicalObject(type_id, quantity, concentration))
            rs3.next()
        }


        //Step Query
        val rs4 = st.executeQuery("Select Distinct step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID from Database.Steps join Database.Experiments on Database.Experiments.ExperimentsID = Database.Steps.experiment_ID where ExperimentsID = \"$id\" ")
        rs4.last()
        val num3 = rs4.row
        rs4.beforeFirst()
        rs4.fetchSize = num3
        rs4.next()
        for (x in 1..rs4.fetchSize) {
            val step_number = rs4.getInt("step_number")
            val actor_index = rs4.getInt("actor_index")
            val actor_ID = rs4.getBoolean("actor_ID")
            val receiver_index = rs4.getInt("receiver_index")
            val receiver_ID = rs4.getBoolean("receiver_ID")
            val function_ID = rs4.getInt("functionID")
            experiment.steps.add(Step(step_number, actor_index, actor_ID, receiver_index, receiver_ID, function_ID))
            rs4.next()
        }


        return experiment

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return Experiment()
}


