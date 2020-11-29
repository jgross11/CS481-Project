package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.*
import java.sql.SQLException


/**
 *  This function loads all of the necessary components to load and interact with an experiment on the front end.
 *  Components loaded include:
 *  Experiment properties - name, creator and experimentID
 *  A list containing all equipment
 *  A list containing all chemical instances (amounts, concentrations)
 *  A list containing all step information
 *  A list containing all chemical information for chemical instances (molar mass, formula, etc.) - TODO WIP
 *  A list containing all chemical equation information (reactant / product formulas and coefficients) - TODO WIP
 *  @param id: the id of the experiment to load
 *  @return: the constructed Experiment object
 */
fun LoadExperiment(id: String) : Experiment {
    val connection = getDBConnection()
    if(connection != null) {
        try {

            //Experiment object
            var experiment = Experiment()

            //Creator name query
            var preparedSt = connection.prepareStatement("Select Distinct title, firstName, lastName from Database.Experiments join Database.Users on Database.Experiments.creatorID = Database.Users.UserID where ExperimentsID = ? ")
            preparedSt.setString(1, id)
            var rs = preparedSt.executeQuery()
            rs.fetchSize = 2
            rs.next()
            val title = rs.getString("title")
            val creatorName = rs.getString("firstName") + " " + rs.getString("lastName")
            experiment.title = title
            experiment.creatorName = creatorName


            //Equipment query
            preparedSt = connection.prepareStatement("Select Distinct object_ID, amount from Database.Equipments join Database.Experiments on Database.Experiments.ExperimentsID = Database.Equipments.experiment_ID where ExperimentsID = ? ")
            preparedSt.setString(1, id)

            val rs2 = preparedSt.executeQuery()

            rs2.last()
            val num = rs2.row
            rs2.beforeFirst()
            rs2.fetchSize = num
            experiment.equipment = Array<EquipmentObject>(rs2.fetchSize) { EquipmentObject(0, 0) }
            rs2.next()
            for (x in 1..rs2.fetchSize) {
                val object_ID = rs2.getInt("object_ID")
                val amount = rs2.getInt("amount")
                experiment.equipment[x - 1] = (EquipmentObject(object_ID, amount))
                rs2.next()
            }

            //Chemical instance query
            preparedSt = connection.prepareStatement("Select type_id, mass, concentration from Database.Chemicals join Database.Experiments on Database.Experiments.ExperimentsID = Database.Chemicals.experiment_ID where experiment_ID = ? ")
            preparedSt.setString(1, id)

            val rs3 = preparedSt.executeQuery()
            rs3.last()
            val num2 = rs3.row
            rs3.beforeFirst()
            rs3.fetchSize = num2
            experiment.chemicals = Array<ChemicalObject>(rs3.fetchSize) { ChemicalObject(0, 0.0, 0.0) }
            rs3.next()
            for (x in 1..rs3.fetchSize) {
                val typeId = rs3.getInt("type_id")
                val quantity = rs3.getDouble("mass")
                val concentration = rs3.getDouble("concentration")
                experiment.chemicals[x - 1] = ChemicalObject(typeId, quantity, concentration)
                rs3.next()
            }

            // chemical properties query
            preparedSt = connection.prepareStatement("SELECT * FROM Database.Chemical_Information JOIN Database.Experiment_ChemicalInformation ON ExperimentID = ? AND ChemicalInformationID = idChemical_Information JOIN Database.ChemistryGraphics ON ChemicalID = idChemical_Information")
            preparedSt.setString(1, id)
            rs = preparedSt.executeQuery()
            rs.last()
            var numRows = rs.row
            rs.beforeFirst()
            experiment.chemicalProperties = Array<ChemicalProperties>(numRows){ChemicalProperties()}
            rs.next()
            for(x in 1..numRows){
                var newChem = ChemicalProperties(rs.getInt(1), rs.getString(2), rs.getString(3),
                                            rs.getDouble(4), rs.getDouble(5), rs.getBoolean(6),
                                            rs.getDouble(7), rs.getDouble(8), rs.getInt(9))
                newChem.colors.gasColor = rs.getInt(15)
                newChem.colors.liquidColor = rs.getInt(16)
                newChem.colors.solidColor = rs.getInt(17)
                experiment.chemicalProperties[x-1] = newChem
                rs.next()
            }

            // equation information query
            preparedSt = connection.prepareStatement("SELECT * FROM Database.Equations_Information, Database.Experiment_Equation, Database.Equation_Components WHERE ExperimentID = ? AND EquationInformationID = Experiment_Equation.EquationID AND EquationInformationID = Equation_Components.EquationID")
            preparedSt.setString(1, id)
            rs = preparedSt.executeQuery()

            val equationMap = HashMap<Int, ChemicalEquation>()
            if(rs.first()){
                do{
                    var equation = equationMap[rs.getInt(equationIDIndex)]
                    // append new component if equation object already created
                    if(equation != null){
                        // if component is reactant
                        if(rs.getBoolean(8)){
                            equation.reactants = equation.reactants.plus(EquationComponent(rs.getInt(9), rs.getInt(10)))
                        } else{
                            equation.products = equation.products.plus(EquationComponent(rs.getInt(9), rs.getInt(10)))
                        }
                        // put updated equation back into map
                        equationMap[equation.equationID] = equation
                    }
                    // otherwise, create the equation object with the first piece of information
                    else{
                        equation = ChemicalEquation(rs.getInt(equationIDIndex), rs.getInt(2))
                        if(rs.getBoolean(isReactantIndex)){
                            equation.reactants = Array(1){ EquationComponent(rs.getInt(9), rs.getInt(10)) }
                        } else{
                            equation.products = Array(1){ EquationComponent(rs.getInt(9), rs.getInt(10)) }
                        }
                        // put new equation back into map
                        equationMap[equation.equationID] = equation
                    }
                }while(rs.next())

                // create equations list with values of populated map
                experiment.equations = equationMap.values.toTypedArray()
            }


            //Step Query
            preparedSt = connection.prepareStatement("Select Distinct step_number, actor_index, actor_ID, receiver_index, receiver_ID, functionID from Database.Steps join Database.Experiments on Database.Experiments.ExperimentsID = Database.Steps.experiment_ID where ExperimentsID = ? ")
            preparedSt.setString(1, id)

            val rs4 = preparedSt.executeQuery()
            rs4.last()
            val num3 = rs4.row
            rs4.beforeFirst()
            rs4.fetchSize = num3
            experiment.steps = Array<Step>(rs4.fetchSize) { Step(-1, -1, true, -1, true, -1) }
            rs4.next()
            for (x in 1..rs4.fetchSize) {
                val step_number = rs4.getInt("step_number")
                val actor_index = rs4.getInt("actor_index")
                val actor_ID = rs4.getBoolean("actor_ID")
                val receiver_index = rs4.getInt("receiver_index")
                val receiver_ID = rs4.getBoolean("receiver_ID")
                val function_ID = rs4.getInt("functionID")
                experiment.steps[x - 1] = Step(step_number, actor_index, actor_ID, receiver_index, receiver_ID, function_ID)
                rs4.next()
            }


            return experiment

        } catch (ex: SQLException) {
            // handle any errors
            ex.printStackTrace()
        } catch (ex: Exception) {
            // handle any errors
            ex.printStackTrace()
        }
    }

    return Experiment()
}