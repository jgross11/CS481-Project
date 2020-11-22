package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.ChemicalProperties
import edu.ycpcsp.ycpcsp.PostDataClasses.EquationFormData
import java.lang.NullPointerException
import java.sql.SQLException
import java.sql.Statement

/**
 *  Inserts an equation into the DB
 *  equation - the EquationFormData object whose information will be added to the database
 *  return - true if the addition was successful, false otherwise
 */
fun insertEquation(equation : EquationFormData) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            // create array that holds relevant reactant information
            // TODO the entire information is not necessary, can rewrite with new query
            // TODO to just find the chemical informationID.
            val reactantsInformation = Array(equation.reactants.size){ChemicalProperties()}

            // create array that holds relevant product information
            // TODO the entire information is not necessary, can rewrite with new query
            // TODO to just find the chemical informationID.
            val productsInformation = Array(equation.products.size){ChemicalProperties()}

            // populate reactants information array
            for (i in equation.reactants.indices){
                reactantsInformation[i] = getCompoundInformationByFormula(equation.reactants[i][1])!!
            }

            // populate products information array
            for (i in equation.products.indices){
                productsInformation[i] = getCompoundInformationByFormula(equation.products[i][1])!!
            }

            // now that every reactant / product's information has been found, we can create a new equation
            var preparedStatement = connection.prepareStatement("INSERT INTO Database.Equations_Information (CreatorUserID) VALUES (?);", Statement.RETURN_GENERATED_KEYS)
            preparedStatement.setInt(1, equation.userID)
            preparedStatement.executeUpdate()
            val rs = preparedStatement.generatedKeys
            if(rs.next()){
                val equationID = rs.getInt(1)
                // insert the relevant information for each reactant
                for(i in equation.reactants.indices) {
                    preparedStatement = connection.prepareStatement("INSERT INTO Database.Equation_Components (EquationID, isReactant, ChemicalCoefficient, ChemicalInformationID,Rating) VALUES (?, ?, ?, ?,?);")
                    preparedStatement.setInt(1, equationID)
                    preparedStatement.setBoolean(2, true)
                    preparedStatement.setInt(3, equation.reactants[i][0].toInt())
                    preparedStatement.setInt(4, reactantsInformation[i].chemicalInformationID)
                    preparedStatement.setInt(5,0)
                    preparedStatement.executeUpdate()
                }
                // insert the relevant information for each product
                for(i in equation.products.indices) {
                    preparedStatement = connection.prepareStatement("INSERT INTO Database.Equation_Components (EquationID, isReactant, ChemicalCoefficient, ChemicalInformationID, Rating) VALUES (?, ?, ?, ?, ?);")
                    preparedStatement.setInt(1, equationID)
                    preparedStatement.setBoolean(2, false)
                    preparedStatement.setInt(3, equation.products[i][0].toInt())
                    preparedStatement.setInt(4, productsInformation[i].chemicalInformationID)
                    preparedStatement.setInt(5,0)
                    preparedStatement.executeUpdate()
                }
                return true
            }
            false
        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
        // occurs when chemical information query fails (chemical information not in DB at all, or required information is not present (older entries only))
        catch(ex: NullPointerException){
            System.err.println("At least one product or reactant's chemical information fetching failed when attempting to insert an equation into the DB. ")
            false
        }
    }
    return false
}