package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import kotlin.collections.ArrayList


fun RecentExperimentSearch(userId: Int) : ArrayList<String> {
    var connection = getDBConnection()

    try{
          if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT * FROM Database.RecentExperiments where idRecentExperiments = ?;")
            preparedSt.setInt(1, userId)

            val rs = preparedSt.executeQuery()

            //make string list to store the names in
            val RecentExperiments = arrayListOf<String>()

            //find the fetch size by going to end
            rs.last()
            val num = rs.row
            rs.beforeFirst()
            rs.fetchSize = num

            //go to first value and start putting the names of the experiments in the list
            rs.next()
            for (x in 1..rs.fetchSize) {

                RecentExperiments.add(rs.getString("ExperimentName"))
            }

            //return the names mutable list
            return RecentExperiments
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    //If you get here then there was a failure so return empty array
    return arrayListOf()
}