package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import java.sql.SQLException

// equation DB indices
const val equationIDIndex = 1
const val equationReactantIndex = 2
const val equationProductIndex = 3
const val equationCreatorIndex = 4

/**
 *  Searches the database for an equation whose ID matches that provided
 *  id - the ID of the desired equation
 *  returns - a ChemicalEquation object that holds the information about the equation, null if no equation found
 */
fun getEquationById(id : Int) : ChemicalEquation?{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Equations_Information WHERE EquationInformationID = ?;")
            preparedStatement.setInt(1, id)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                ChemicalEquation(rs.getInt(equationIDIndex), rs.getString(equationReactantIndex), rs.getString(equationProductIndex), rs.getInt(equationCreatorIndex))
            } else{
                null
            }

        } catch(ex : SQLException){
            ex.printStackTrace()
            null
        }
    }
    return null
}