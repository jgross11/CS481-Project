package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.User
import java.sql.SQLException
import java.sql.Statement

/**
 * Given a users' userID, attempt to
 * create a recovery key in the DB
 * userID: the userID of the user who wants to recover their password
 * return: the recoveryID of the key created, -1 otherwise
 */
fun createRecoveryKeyByID(userID : Int) : Int{
    var connection = getDBConnection()
    if(connection != null){
        return try{
          var preparedStatement = connection.prepareStatement("INSERT INTO Database.Recovery_IDS (userID) VALUES (?)", Statement.RETURN_GENERATED_KEYS)
            preparedStatement.setInt(1, userID)
            preparedStatement.execute()
            val rs = preparedStatement.generatedKeys
            if(rs.next()){
                return rs.getInt(1)
            }
            -1

        } catch(e : SQLException){
            e.printStackTrace()
            -1
        }
    }
    return -1
}

/**
 * Given a recoveryID, query for its accompanying userID's
 * User and return it so that the user can reset their password
 * recoveryID: the recoveryID of the user who wants to recover their password
 * return: a User object representing the user who wants to recover their password,
 * return: 'null' User if the recoveryID doesn't exist or the user doesn't exist
 */
fun getUserByRecoveryKeyID(recoveryID : Int) : User {
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("SELECT email FROM Database.Users WHERE EXISTS (SELECT userID FROM Database.Recovery_IDS WHERE recoveryID = ? AND Database.Recovery_IDS.userID = Database.Users.UserID);")
            preparedStatement.setInt(1, recoveryID)
           val rs = preparedStatement.executeQuery()
            if(rs.first()){
                return LoadUser(rs.getString(1))
            }
            User()

        } catch(e : SQLException){
            e.printStackTrace()
            User()
        }
    }
    return User()
}

// TODO Delete recovery key given recovery key ID

// TODO update password of user
// UPDATE Database.Users SET Database.Users.password = ? WHERE Database.Users.UserID = ?;