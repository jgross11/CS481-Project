package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import edu.ycpcsp.ycpcsp.Models.EquationComponent
import java.sql.SQLException

// equation DB indices
const val equationIDIndex = 1
const val equationCreatorIndex = 2
const val ratingIndex = 3
const val isReactantIndex = 6
const val coefficientIndex = 7
const val chemicalInformationIndex = 8

/**
 *  Searches the database for an equation whose ID matches that provided
 *  id - the ID of the desired equation
 *  returns - a ChemicalEquation object that holds the information about the equation, null if no equation found
 */
fun getEquationById(id : Int) : ChemicalEquation?{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Equations_Information JOIN Database.Equation_Components ON EquationInformationID = EquationID and Equations_Information.EquationInformationID = ?;")
            preparedStatement.setInt(1, id)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                var equation = ChemicalEquation(rs.getInt(equationIDIndex), rs.getInt(equationCreatorIndex), rs.getInt(ratingIndex))
                var reactants = ArrayList<EquationComponent>()
                var products = ArrayList<EquationComponent>()

                do{
                    if(rs.getBoolean(isReactantIndex)){
                        reactants.add(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))
                    } else{
                        products.add(EquationComponent(rs.getInt(coefficientIndex), rs.getInt(chemicalInformationIndex)))
                    }
                }
                while(rs.next())
                equation.reactants = reactants.toTypedArray()
                equation.products = products.toTypedArray()
                equation
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