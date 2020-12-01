package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun InsertPlaylistFollowing(Userid: Int, PlaylistId: Int) : Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {

            var preparedSt = connection.prepareStatement("INSERT INTO Database.PlaylistFollows(PlaylistID, UserID) VALUES (?, ?)")
            preparedSt.setInt(1, PlaylistId)
            preparedSt.setInt(2, Userid)
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