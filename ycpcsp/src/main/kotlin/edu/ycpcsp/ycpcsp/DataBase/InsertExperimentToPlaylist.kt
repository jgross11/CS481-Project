package edu.ycpcsp.ycpcsp.DataBase


import java.sql.SQLException

fun InsertExperimentToPlaylist(Experiment_ID: Int, Playlist_ID: Int) : Boolean {


    var connection = getDBConnection()

    try {
        if(connection != null) {

            var preparedSt = connection.prepareStatement("INSERT INTO Database.Playlist_Experiments(Experiment_ID, Playlist_Id) VALUES (?, ?)")
            preparedSt.setInt(1, Experiment_ID)
            preparedSt.setInt(2, Playlist_ID)
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