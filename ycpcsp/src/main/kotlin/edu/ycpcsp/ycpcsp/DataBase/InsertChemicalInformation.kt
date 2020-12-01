package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalProperties
import java.sql.SQLException
import java.sql.Statement

fun insertElement(){

}

fun insertCompound(comp : ChemicalProperties) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            var preparedStatement = connection.prepareStatement("INSERT INTO Database.Chemical_Information (Chemical_Formula, Chemical_Name, Chemical_Mass, Chemical_Density, Chemical_Water_Soluble, Chemical_Phase_Change_Solid, Chemical_Phase_Change_Gas,Chemical_Rating) VALUES (?, ?, ?, ?, ?, ?, ?,?)", Statement.RETURN_GENERATED_KEYS)
            preparedStatement.setString(1, comp.formula)
            preparedStatement.setString(2, comp.name)
            preparedStatement.setDouble(3, comp.molarMass)
            preparedStatement.setDouble(4, comp.density)
            preparedStatement.setBoolean(5, comp.isWaterSoluable)
            preparedStatement.setDouble(6, comp.meltingPoint)
            preparedStatement.setDouble(7, comp.boilingPoint)
            preparedStatement.setInt(8,0);
            preparedStatement.executeUpdate()
            var rs = preparedStatement.generatedKeys

            if(rs.next()){
                comp.chemicalInformationID = rs.getInt(1)
            }

            preparedStatement = connection.prepareStatement("INSERT INTO Database.ChemistryGraphics (GasInteger, LiquidInteger, SolidInteger, ChemicalID) VALUES (?, ?, ?, ?);")
            preparedStatement.setInt(1, comp.colors.gasColor)
            preparedStatement.setInt(2, comp.colors.liquidColor)
            preparedStatement.setInt(3, comp.colors.solidColor)
            preparedStatement.setInt(4, comp.chemicalInformationID)
            preparedStatement.executeUpdate()


            true
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}