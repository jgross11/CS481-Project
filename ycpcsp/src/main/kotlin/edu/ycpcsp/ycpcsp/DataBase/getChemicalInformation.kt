package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import java.sql.SQLException

// element DB indices


// compound DB indices
const val CompoundIDIndex = 1
const val CompoundFormulaIndex = 2
const val CompoundNameIndex = 3
const val CompoundDensityIndex = 4
const val CompoundSolubleIndex = 5
const val CompoundSolidIndex = 6
const val CompoundGasIndex = 7
const val CompoundLiquidIndex = 8

fun getCompoundInformationByName(name : String) : Compound?{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information WHERE Chemical_Name = ?;")
            preparedStatement.setString(1, name)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                Compound(rs.getInt(CompoundIDIndex), rs.getString(CompoundFormulaIndex), rs.getString(CompoundNameIndex), rs.getDouble(CompoundDensityIndex),
                        rs.getBoolean(CompoundSolubleIndex), rs.getDouble(CompoundSolidIndex), rs.getDouble(CompoundGasIndex), rs.getDouble(CompoundLiquidIndex))
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

fun getCompoundInformationByID(id : Int) : Compound?{

    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information WHERE idChemical_Information = ?;")
            preparedStatement.setInt(1, id)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                Compound(rs.getInt(CompoundIDIndex), rs.getString(CompoundFormulaIndex), rs.getString(CompoundNameIndex), rs.getDouble(CompoundDensityIndex),
                        rs.getBoolean(CompoundSolubleIndex), rs.getDouble(CompoundSolidIndex), rs.getDouble(CompoundGasIndex), rs.getDouble(CompoundLiquidIndex))
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