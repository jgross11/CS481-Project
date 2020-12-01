package edu.ycpcsp.ycpcsp.DataBase


import java.sql.SQLException

fun InsertPlaylisy(Userid: Int, Playlist_Name: String) : Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {

            var preparedSt = connection.prepareStatement("INSERT INTO Database.Playlist(user_ID, Playlist_Name) VALUES (?, ?)")
            preparedSt.setInt(1, Userid)
            preparedSt.setString(2, Playlist_Name)
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