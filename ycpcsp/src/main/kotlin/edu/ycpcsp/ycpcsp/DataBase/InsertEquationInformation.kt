package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import java.sql.SQLException

/**
 *  Inserts an equation into the DB
 *  equation - the ChemicalEquation object whose information will be added to the database
 *  return - true if the addition was successful, false otherwise
 */
fun insertEquation(equation : ChemicalEquation) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("INSERT INTO Database.Equations_Information (Equations_ReactantString, Equations_ProductString, Equations_CreatorID) VALUES (?, ?, ?);")
            preparedStatement.setString(1, equation.reactantString)
            preparedStatement.setString(2, equation.productString)
            preparedStatement.setInt(3, equation.creatorID)
            val rs = preparedStatement.executeUpdate()
            true
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}