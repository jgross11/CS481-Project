package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import edu.ycpcsp.ycpcsp.Models.ChemicalEquationResult
import edu.ycpcsp.ycpcsp.Models.EquationComponent
import java.lang.NullPointerException
import java.sql.SQLException

/**
 *  Returns an array containing all equation information in DB for FE search purposes
 */

const val equationFormulaIndex = 10

fun getAllEquationInformation() : Array<ChemicalEquationResult?>?{
    var connection = getDBConnection()
    if(connection != null){
        return try{

            // return every equation component entry joined with its equation information entry
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Equations_Information JOIN Database.Equation_Components ON EquationInformationID = EquationID JOIN Database.Chemical_Information ON ChemicalInformationID = idChemical_Information;")
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){

                // obtain number of rows in result set
                rs.last()
                val numRows = rs.row
                rs.first()

                // maps equationID to the appropriate equation, for 'serial' loading of equation information
                val equationMap = HashMap<Int, ChemicalEquationResult>()
                for(i in 0 until numRows){
                    var equation = equationMap[rs.getInt(equationIDIndex)]
                    // append new component if equation object already created
                    if(equation != null){
                        if(rs.getBoolean(isReactantIndex)){
                            equation.reactantCoefficients = equation.reactantCoefficients.plus(rs.getInt(coefficientIndex))
                            equation.reactantFormulas = equation.reactantFormulas.plus(rs.getString(equationFormulaIndex))
                        } else{
                            equation.productCoefficients = equation.productCoefficients.plus(rs.getInt(coefficientIndex))
                            equation.productFormulas = equation.productFormulas.plus(rs.getString(equationFormulaIndex))
                        }
                        // put updated equation back into map
                        equationMap[equation.equationID] = equation
                    }
                    // otherwise, create the equation object with the first piece of information
                    else{
                        equation = ChemicalEquationResult(rs.getInt(equationIDIndex))
                        if(rs.getBoolean(isReactantIndex)){
                            equation.reactantCoefficients = intArrayOf(rs.getInt(coefficientIndex))
                            equation.reactantFormulas = Array(1){rs.getString(equationFormulaIndex)}
                        } else{
                            equation.productCoefficients = intArrayOf(rs.getInt(coefficientIndex))
                            equation.productFormulas = Array(1){rs.getString(equationFormulaIndex)}
                        }
                        // put updated equation back into map
                        equationMap[equation.equationID] = equation
                    }
                    // next row in result set
                    rs.next()
                }
                // return map values (equations) as array
                // must set string here as toString function is lost
                // when converted to JSON
                val equationArr : Array<ChemicalEquationResult?>? = equationMap.values.toTypedArray()
                if (equationArr != null) {
                    for(equation in equationArr){
                        if (equation != null) {
                            equation.string = equation.toString()
                        }
                    }
                }
                equationArr
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