package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun RemovePlaylistDatabase(PlaylistId: Int) : Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {



            var preparedSt = connection.prepareStatement("DELETE FROM Database.Playlist WHERE Playlist_ID = ?")
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