package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun FindMyExperiments(user: User): MutableList<Experiment> {
    var connection = getDBConnection()
  
    val CREATORID = 1
    val TITLE = 2

    //This creates an empty array of Experiment
    val experiments = mutableListOf<Experiment>()

    try {
        if(connection != null) {
            //set Finds all the experiments based off of a user's id
            var preparedSt = connection.prepareStatement("SELECT * FROM Database.Experiments where creatorID = ?;")
            preparedSt.setInt(1, user.id)
            val rs = preparedSt.executeQuery()


            while (rs.next()) {
                //For testing purposes. Ensures that values are correct before putting it into an experiment
                //println("The title is ${rs.getString(TITLE)} and the user id is ${rs.getInt(CREATORID)}")

                experiments.add(Experiment(rs.getString(TITLE), "${user.firstName} ${user.lastName}", rs.getInt(CREATORID)))
            }



            return experiments
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return experiments
}