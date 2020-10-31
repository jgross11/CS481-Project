package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*
import java.sql.Statement
import kotlin.math.exp

fun ModifyExperiment(experiment: Experiment): Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {

            //Edit Experiment table, delete later?
            //Need to modify all experiment id
            var preparedSt = connection.prepareStatement("UPDATE Database.Experiments" +
                    "SET title = ?" +
                    "WHERE ExperimentsID = ?;")
            preparedSt.setString(1, experiment.title)
            preparedSt.setInt(2, experiment.experimentID)
            preparedSt.executeUpdate()

            //Edit Chemistry table
            for (chemical in experiment.chemicals) {
                preparedSt = connection.prepareStatement("UPDATE Database.Chemicals" +
                        "SET type_id = ?, mass = ?, concentration = ?" +
                        "WHERE experiment_ID = ?;")
                preparedSt.setInt(1, chemical.id)
                preparedSt.setDouble(2, chemical.mass)
                preparedSt.setDouble(3, chemical.concentration)
                preparedSt.setInt(4, experiment.experimentID)
                preparedSt.executeUpdate()
            }


            //Edit Equipment table
            for (equipment in experiment.equipment) {
                preparedSt = connection.prepareStatement("UPDATE Database.Equipments" +
                        "SET object_ID = ?, amount = ?" +
                        "WHERE experiment_ID = ?;")
                preparedSt.setInt(1, equipment.objectID)
                preparedSt.setInt(2, equipment.amount)
                preparedSt.setInt(3, experiment.experimentID)
                preparedSt.executeUpdate()
            }

            //edit Steps table
            for (steps in experiment.steps) {
                preparedSt = connection.prepareStatement("UPDATE Database.Steps" +
                        "SET step_number = ?, actor_index = ?, actor_ID = ?, receiver_index = ?, receiver_ID = ?, functionID = ?" +
                        "WHERE experiment_ID = ?;")
                preparedSt.setInt(1, steps.stepNumber)
                preparedSt.setInt(2, steps.actorIndex)
                preparedSt.setBoolean(3, steps.actorID)
                preparedSt.setInt(4, steps.receiverIndex)
                preparedSt.setBoolean(5, steps.receiverID)
                preparedSt.setInt(6, steps.functionID)
                preparedSt.setInt(7, experiment.experimentID)
                preparedSt.executeUpdate()
            }

            return true
        }

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