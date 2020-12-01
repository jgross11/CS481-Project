package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun RemovePlaylist(PlaylistId: Int) : Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {

            var preparedSt = connection.prepareStatement("DELETE FROM Database.Playlist WHERE PlaylistID = ?")
            preparedSt.setInt(1, PlaylistId)
            preparedSt.executeUpdate()

            preparedSt = connection.prepareStatement("DELETE FROM Database.PlaylistFollowing WHERE PlaylistID = ?")
            preparedSt.setInt(1, PlaylistId)
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