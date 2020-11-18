package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquationResult
import edu.ycpcsp.ycpcsp.Models.ChemicalInformation
import java.sql.SQLException

/**
 *  returns all chemical information in DB for FE search purposes
 */
fun getAllChemicalInformation() : Array<ChemicalInformation>?{
    var connection = getDBConnection()
    if(connection != null){
        return try{

            // return every chemical information entry
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information;")
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){

                // obtain number of rows in result set
                rs.last()
                val numRows = rs.row
                rs.first()

                // create and populate array
                // TODO this is only retrieving partial information i.e. no colors
                // TODO will need to be rewritten when chemical information is modularized
                val chemicalArray : Array<ChemicalInformation> = Array(numRows){ ChemicalInformation() }
                for(i in 0 until numRows){
                    chemicalArray[i] = ChemicalInformation(rs.getInt(1),
                            rs.getString(2), rs.getString(3),
                            rs.getDouble(4), rs.getDouble(5),
                            rs.getBoolean(6), rs.getDouble(7),
                            rs.getDouble(8), rs.getInt(9))
                    // next row in result set
                    rs.next()
                }
                // return array
                chemicalArray
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