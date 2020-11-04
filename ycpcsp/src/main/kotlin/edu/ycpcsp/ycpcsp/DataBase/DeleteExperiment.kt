package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun DeleteExperiment(experimentId: Int) : Boolean {
    //experimentId, front end needs to somehow know what the experiments Id is
    var connection = getDBConnection()

    try {
        if(connection != null) {
            //The database has the foreign keys set up so that once the "master" foreign key is deleted the rest
            //will be cascaded down and delete all instances where that foreign key was inserted
            //Steps currently has no foreign key so i'll have to edit that later
            //delet experimentId
            var preparedSt = connection.prepareStatement("DELETE FROM Database.Experiments WHERE ExperimentsID = ?")
            preparedSt.setInt(1, experimentId)
            preparedSt.executeUpdate()

            preparedSt = connection.prepareStatement("DELETE FROM Database.Steps WHERE experiment_ID = ?")
            preparedSt.setInt(1, experimentId)
            preparedSt.executeUpdate()

            return true
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return false
}