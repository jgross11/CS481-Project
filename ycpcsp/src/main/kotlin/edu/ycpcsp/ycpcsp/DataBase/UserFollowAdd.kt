package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun UserFollowAdd(Userid: Int, FollowerUserID: Int) : Boolean {

    var connection = getDBConnection()

    try {
        if(connection != null) {

            var preparedSt = connection.prepareStatement("INSERT INTO Database.UserFollow(UserID, FollowUserID)  VALUES (?, ?)")
            preparedSt.setInt(1, Userid)
            preparedSt.setInt(2, FollowerUserID)
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