package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import java.sql.SQLException

fun getChemicalInformationByName(name : String){

}

fun getCompoundInformationByID(id : Int) : Compound?{
    val idIndex = 1
    val formulaIndex = 2
    val nameIndex = 3
    val densityIndex = 4
    val solubleIndex = 5
    val solidIndex = 6
    val gasIndex = 7
    val liquidIndex = 8
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information WHERE idChemical_Information = ?;")
            preparedStatement.setInt(1, id)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                Compound(rs.getInt(idIndex), rs.getString(formulaIndex), rs.getString(nameIndex), rs.getDouble(densityIndex),
                        rs.getBoolean(solubleIndex), rs.getDouble(solidIndex), rs.getDouble(gasIndex), rs.getDouble(liquidIndex))
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