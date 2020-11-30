package edu.ycpcsp.ycpcsp.DataBase

import java.sql.SQLException

fun insertChemicalRatingwithUserID(Userid: Int, ChemicalID: Int) :Boolean {

    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("INSERT INTO Database.Chemical_Rating (Userid, ChemicalID) VALUES (?,?)")
            preparedStatement.setInt(1,Userid);
            preparedStatement.setInt(2,ChemicalID);
            preparedStatement.executeUpdate()

            true
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}

fun insertEquationRatingwithUserId(Userid: Int, EquationID: Int) : Boolean{

    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("INSERT INTO Database.Equation_Rating (Userid, EquationID) VALUES (?,?)")
            preparedStatement.setInt(1,Userid);
            preparedStatement.setInt(2,EquationID);
            preparedStatement.executeUpdate()

            true
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false

}

