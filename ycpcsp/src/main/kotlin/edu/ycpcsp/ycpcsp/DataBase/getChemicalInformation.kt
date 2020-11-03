package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import java.sql.SQLException

// element DB indices


// compound DB indices
const val CompoundIDIndex = 1
const val CompoundFormulaIndex = 2
const val CompoundNameIndex = 3
const val CompoundMassIndex = 4
const val CompoundDensityIndex = 5
const val CompoundSolubleIndex = 6
const val CompoundSolidIndex = 7
const val CompoundGasIndex = 8

fun getCompoundInformationByName(name : String) : Compound?{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information WHERE Chemical_Name = ?;")
            preparedStatement.setString(1, name)
            var rs = preparedStatement.executeQuery()
            return if(rs.first()){
                var comp = Compound(rs.getInt(CompoundIDIndex), rs.getString(CompoundFormulaIndex), rs.getString(CompoundNameIndex), rs.getDouble(CompoundMassIndex), rs.getDouble(CompoundDensityIndex),
                        rs.getBoolean(CompoundSolubleIndex), rs.getDouble(CompoundSolidIndex), rs.getDouble(CompoundGasIndex))
                preparedStatement = connection.prepareStatement("SELECT * FROM Database.ChemistryGraphics WHERE ChemicalID = ?;")
                preparedStatement.setInt(1, comp.compoundID)
                rs = preparedStatement.executeQuery()
                return if(rs.first()){
                    comp.colors.gasColor = rs.getInt(3)
                    comp.colors.liquidColor = rs.getInt(4)
                    comp.colors.solidColor = rs.getInt(5)
                    comp
                } else{
                    null
                }
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
            var preparedStatement = connection.prepareStatement("SELECT * FROM Database.Chemical_Information WHERE idChemical_Information = ?;")
            preparedStatement.setInt(1, id)
            var rs = preparedStatement.executeQuery()
            return if(rs.first()){
                var comp = Compound(rs.getInt(CompoundIDIndex), rs.getString(CompoundFormulaIndex), rs.getString(CompoundNameIndex), rs.getDouble(CompoundMassIndex), rs.getDouble(CompoundDensityIndex),
                        rs.getBoolean(CompoundSolubleIndex), rs.getDouble(CompoundSolidIndex), rs.getDouble(CompoundGasIndex))
                preparedStatement = connection.prepareStatement("SELECT * FROM Database.ChemistryGraphics WHERE ChemicalID = ?;")
                preparedStatement.setInt(1, comp.compoundID)
                rs = preparedStatement.executeQuery()
                return if(rs.first()){
                    comp.colors.gasColor = rs.getInt(3)
                    comp.colors.liquidColor = rs.getInt(4)
                    comp.colors.solidColor = rs.getInt(5)
                    comp
                } else{
                    null
                }
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