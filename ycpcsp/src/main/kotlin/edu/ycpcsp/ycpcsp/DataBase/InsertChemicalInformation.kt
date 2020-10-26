package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import java.sql.SQLException

fun insertElement(){

}

fun insertCompound(comp : Compound) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("INSERT INTO Database.Chemical_Information (Chemical_Formula, Chemical_Name, Chemical_Density, Chemical_Water_Soluble, Chemical_Phase_Change_Solid, Chemical_Phase_Change_Gas, Chemical_Phase_Change_Liquid) VALUES (?, ?, ?, ?, ?, ?, ?)")
            preparedStatement.setString(1, comp.formula)
            preparedStatement.setString(2, comp.name)
            preparedStatement.setDouble(3, comp.density)
            preparedStatement.setBoolean(4, comp.isWaterSoluable)
            preparedStatement.setDouble(5, comp.solidTemp)
            preparedStatement.setDouble(6, comp.gasTemp)
            preparedStatement.setDouble(7, comp.liquidTemp)
            val rs = preparedStatement.executeUpdate()
            true
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}