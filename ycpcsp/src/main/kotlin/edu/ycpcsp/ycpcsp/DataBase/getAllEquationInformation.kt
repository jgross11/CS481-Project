package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import edu.ycpcsp.ycpcsp.Models.EquationComponent
import java.lang.NullPointerException
import java.sql.SQLException

/**
 *  Returns an array containing all equation information in DB for FE search purposes
 */
fun getAllEquationInformation() : Array<ChemicalEquation?>?{
    var connection = getDBConnection()
    if(connection != null){
        return try{

            // return every equation component entry joined with its equation information entry
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Equations_Information JOIN Database.Equation_Components ON EquationInformationID = EquationID;")
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){

                // obtain number of rows in result set
                rs.last()
                val numRows = rs.row
                rs.first()

                // maps equationID to the appropriate equation, for 'serial' loading of equation information
                // this code ran correctly on the first try, yes I am very proud of it
                val equationMap = HashMap<Int, ChemicalEquation>()
                for(i in 0 until numRows){
                    var equation = equationMap[rs.getInt(equationIDIndex)]
                    // append new component if equation object already created
                    if(equation != null){
                        if(rs.getBoolean(isReactantIndex)){
                            equation.reactants = equation.reactants.plus(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))
                        } else{
                            equation.products = equation.products.plus(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))
                        }
                        // put updated equation back into map
                        equationMap[equation.equationID] = equation
                    }
                    // otherwise, create the equation object with the first piece of information
                    else{
                        equation = ChemicalEquation(rs.getInt(equationIDIndex), rs.getInt(equationCreatorIndex))
                        if(rs.getBoolean(isReactantIndex)){
                            equation.reactants = Array(1){(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))}
                        } else{
                            equation.products = Array(1){(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))}
                        }
                        // put updated equation back into map
                        equationMap[equation.equationID] = equation
                    }
                    // next row in result set
                    rs.next()
                }
                // return map values (equations) as array
                equationMap.values.toTypedArray()
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