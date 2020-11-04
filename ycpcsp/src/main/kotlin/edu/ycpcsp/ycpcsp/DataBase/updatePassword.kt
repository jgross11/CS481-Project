package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

/**
 *  Given the hashed string of the password and its users' id, update the users' password in the DB
 *  password : the hashed string representing the users' password
 *  id: the users' userID in the DB
 *  return true if update successful, false otherwise
 */
fun updatePassword(password : String, id : Int) : Boolean{
    var connection = getDBConnection()
    if (connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("UPDATE Database.Users set password = ? where userID = ?")
            preparedStatement.setString(1, password)
            preparedStatement.setInt(2, id)
            preparedStatement.executeUpdate()
            true
        }
        catch(e : SQLException){
            e.printStackTrace()
            false
        }
    }
    return false
}