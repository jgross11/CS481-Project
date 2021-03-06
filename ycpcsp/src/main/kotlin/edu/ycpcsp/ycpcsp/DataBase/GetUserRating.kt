package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException


fun getChemRatingbyUser(UserID : Int) : Int{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Rating where Userid = ?;")
            preparedStatement.setInt(1,UserID);
            var rs = preparedStatement.executeQuery()
            return if(rs.first()){
               return rs.getInt(1)
            } else{
                return -1
            }
        } catch(ex : SQLException){
            ex.printStackTrace()
            return -1
        }
    }
    return -1
}
fun getEquationRatingbyUser(UserID : Int) : Int{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("SELECT * FROM Database.Equation_Rating where Userid = ?;")
            preparedStatement.setInt(1,UserID);
            var rs = preparedStatement.executeQuery()
            return if(rs.first()){
                return rs.getInt(1)
            } else{
                return -1
            }
        } catch(ex : SQLException){
            ex.printStackTrace()
            return -1
        }
    }
    return -1}
