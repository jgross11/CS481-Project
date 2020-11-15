package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalObject
import edu.ycpcsp.ycpcsp.Models.EquipmentObject
import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.Step
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun LoadExperiment(id: String) : Experiment {
    val connection = getDBConnection()
    if(connection != null) {
        try {

            //Experiment Query
            var experiment = Experiment()

            //User query
            //These queries dont' have
            var preparedSt = connection.prepareStatement("Select Distinct title, firstName, lastName from Database.Experiments join Database.Users on Database.Experiments.creatorID = Database.Users.UserID where ExperimentsID = ? ")
            preparedSt.setString(1, id)
            val rs = preparedSt.executeQuery()

            rs.fetchSize = 2
            rs.next()
            val title = rs.getString("title")
            val creatorName = rs.getString("firstName") + " " + rs.getString("lastName")
            experiment.title = title
            experiment.creatorName = creatorName


            //Equipment query
            preparedSt = connection.prepareStatement("Select Distinct object_ID, amount from Database.Equipments join Database.Experiments on Database.Experiments.ExperimentsID = Database.Equipments.experiment_ID where ExperimentsID = ? ")
            preparedSt.setString(1, id)

            val rs2 = preparedSt.executeQuery()

            rs2.last()
            val num = rs2.row
            rs2.beforeFirst()
            rs2.fetchSize = num
            experiment.equipment = Array<EquipmentObject>(rs2.fetchSize) { EquipmentObject(0, 0) }
            rs2.next()
            for (x in 1..rs2.fetchSize) {
                val object_ID = rs2.getInt("object_ID")
                val amount = rs2.getInt("amount")
                experiment.equipment[x - 1] = (EquipmentObject(object_ID, amount))
                rs2.next()
            }

            //Chemical query
            preparedSt = connection.prepareStatement("Select type_id, mass, concentration from Database.Chemicals join Database.Experiments on Database.Experiments.ExperimentsID = Database.Chemicals.experiment_ID where experiment_ID = ? ")
            preparedSt.setString(1, id)

            val rs3 = preparedSt.executeQuery()
            rs3.last()
            val num2 = rs3.row
            rs3.beforeFirst()
            rs3.fetchSize = num2
            experiment.chemicals = Array<ChemicalObject>(rs3.fetchSize) { ChemicalObject(0, 0.0, 0.0) }
            rs3.next()
            for (x in 1..rs3.fetchSize) {
                val type_id = rs3.getInt("type_id")
                val quantity = rs3.getDouble("mass")
                val concentration = rs3.getDouble("concentration")
                experiment.chemicals[x - 1] = ChemicalObject(type_id, quantity, concentration)
                rs3.next()
            }


            //Step Query
            preparedSt = connection.prepareStatement("Select Distinct step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID from Database.Steps join Database.Experiments on Database.Experiments.ExperimentsID = Database.Steps.experiment_ID where ExperimentsID = ? ")
            preparedSt.setString(1, id)

            val rs4 = preparedSt.executeQuery()
            rs4.last()
            val num3 = rs4.row
            rs4.beforeFirst()
            rs4.fetchSize = num3
            experiment.steps = Array<Step>(rs4.fetchSize) { Step(-1, -1, true, -1, true, -1) }
            rs4.next()
            for (x in 1..rs4.fetchSize) {
                val step_number = rs4.getInt("step_number")
                val actor_index = rs4.getInt("actor_index")
                val actor_ID = rs4.getBoolean("actor_ID")
                val receiver_index = rs4.getInt("receiver_index")
                val receiver_ID = rs4.getBoolean("receiver_ID")
                val function_ID = rs4.getInt("functionID")
                experiment.steps[x - 1] = Step(step_number, actor_index, actor_ID, receiver_index, receiver_ID, function_ID)
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
    }

    return Experiment()
}