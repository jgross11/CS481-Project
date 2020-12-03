package edu.ycpcsp.ycpcsp.DataBase
import java.sql.SQLException



fun getChemRatingById(ChemID : Int) : Int{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("SELECT Chemical_Rating FROM Database.Chemical_Information  where ChemicalID = ?;")
            preparedStatement.setInt(1,ChemID);
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

fun updateRatingByID(ChemID: Int, Rating: Int) : Int {
    var connection = getDBConnection()
    if (connection != null) {
        return try {
            var preparedStatement = connection.prepareStatement("UPDATE Chemical_Rating FROM Database.Chemical_Information set Chemical_Rating = ? where ChemicalID = ?;")
            preparedStatement.setInt(1, Rating);
            preparedStatement.setInt(2, ChemID);
            preparedStatement.executeUpdate()
        } catch (ex: SQLException) {
            ex.printStackTrace()
            return -1
        }
    }
    return -1
}


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
    return -1
}