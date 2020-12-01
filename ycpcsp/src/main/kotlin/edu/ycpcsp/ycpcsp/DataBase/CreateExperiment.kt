package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException
import edu.ycpcsp.ycpcsp.PostDataClasses.UserAndExperiment
import java.sql.Statement

fun CreateExperiment(userAndExperiment: UserAndExperiment): Int {

   var connection = getDBConnection()

    try {
        if (connection!= null) {

            try {
                //Model classes have not been updated, so the execute will not work
                var preparedSt = connection.prepareStatement("INSERT INTO Database.Experiments (title, creatorID, tags)\n" +
                        "VALUES (?, ?, 0101)", Statement.RETURN_GENERATED_KEYS)
                preparedSt.setString(1, userAndExperiment.experiment.title)
                preparedSt.setInt(2, userAndExperiment.user.id)

                preparedSt.executeUpdate()
                // should be the generated experiment ID
                var rs = preparedSt.generatedKeys
                var newExperimentKey = -1
                if (rs.next()) {
                    newExperimentKey = rs.getInt(1)
                }
                println("New experiment key: $newExperimentKey")

                // insert steps
                for (step in userAndExperiment.experiment.steps) {
                    preparedSt = connection.prepareStatement("INSERT INTO Database.Steps (experiment_ID, step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID)\n" +
                            "VALUES (?, ?, ?, ?, ?, ?, ?)")
                    preparedSt.setInt(1, newExperimentKey)
                    preparedSt.setInt(2, step.stepNumber)
                    preparedSt.setInt(3, step.actorIndex)
                    preparedSt.setBoolean(4, step.isActorEquipment)
                    preparedSt.setInt(5, step.receiverIndex)
                    preparedSt.setBoolean(6, step.isReceiverEquipment)
                    preparedSt.setInt(7, step.functionID)

                    preparedSt.executeUpdate()
                }

                // insert chemical instances
                for (chemical in userAndExperiment.experiment.chemicals) {
                    preparedSt = connection.prepareStatement("INSERT INTO Database.Chemicals (experiment_ID, type_id, mass, concentration)\n" +
                            "VALUES (?, ?, ?, ?)")
                    preparedSt.setInt(1, newExperimentKey)
                    preparedSt.setInt(2, chemical.id)
                    preparedSt.setDouble(3, chemical.mass)
                    preparedSt.setDouble(4, chemical.concentration)
                    preparedSt.executeUpdate()
                }
                // insert equipment
                for (equipment in userAndExperiment.experiment.equipment) {
                    preparedSt = connection.prepareStatement("INSERT INTO Database.Equipments (experiment_ID, object_ID, amount)\n" +
                            "VALUES (?, ?, ?)")
                    preparedSt.setInt(1, newExperimentKey)
                    preparedSt.setInt(2, equipment.objectID)
                    preparedSt.setInt(3, equipment.amount)
                    preparedSt.executeUpdate()
                }

                // insert equations
                for(equation in userAndExperiment.experiment.equations){
                    preparedSt = connection.prepareStatement("INSERT INTO Database.Experiment_Equation (EquationID, ExperimentID) VALUES (?, ?);")
                    preparedSt.setInt(1, equation.equationID)
                    preparedSt.setInt(2, newExperimentKey)
                    preparedSt.executeUpdate()
                }

                // insert chemical information
                for(chemicalInformation in userAndExperiment.experiment.chemicalProperties){
                    preparedSt = connection.prepareStatement("INSERT INTO Database.Experiment_ChemicalInformation (ExperimentID, ChemicalInformationID) VALUES (?, ?);")
                    preparedSt.setInt(1, newExperimentKey)
                    preparedSt.setInt(2, chemicalInformation.chemicalInformationID)
                    preparedSt.executeUpdate()
                }

                // TODO ensure all queries actually execute and handle errors accordingly
                // if the updates work this method will return the newly generated key for loading purposes
                return newExperimentKey
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
        }

        //This means the query failed to find anything
        return -1
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //This means that the result was not the same
    return -1
}