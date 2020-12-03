
package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*

//enum class UserFields {FirstName, LastName, Email, Password, School}
var ID = 1
var FirstName = 2
var LastName = 3
var Email = 4
var Password = 5
var School = 6

fun LoadUser(email: String): User {
    val connection = getDBConnection()

    try {
        if(connection != null) {
            var preparedSt = connection.prepareStatement("SELECT * FROM Database.Users where email = ?;")
            preparedSt.setString(1, email)
            var rs = preparedSt.executeQuery()

            try {
                return if (rs.first()) {
                    var user = User(rs.getString(FirstName), rs.getString(LastName), rs.getString(Email), rs.getString(Password), rs.getString(School), rs.getInt(ID))

                    // attempt to populate user experiment array with preview information
                    preparedSt = connection.prepareStatement("SELECT Experiments.ExperimentsID, Experiments.title FROM Database.Experiments WHERE Experiments.creatorID = ?")
                    preparedSt.setInt(1, user.id)
                    rs = preparedSt.executeQuery()

                    // if user has at least one experiment
                    if(rs.first()) {
                        rs.last()
                        val numExperiments = rs.row
                        rs.first()
                        var userExperimentArr = Array<Experiment>(numExperiments){Experiment()}

                        // populate an array with each experiment's information
                        for(i in 0 until numExperiments){
                            userExperimentArr[i] = Experiment(rs.getString(2), user.getFullName(), rs.getInt(1));
                            rs.next()
                        }
                        // set the user's experiment array to the constructed one
                        user.experiments = userExperimentArr
                    }
                    // return constructed user object
                    user
                } else {
                    User()
                }
            } catch (ex: SQLException) {
                println("Error the query returned with a null result set. The query must have been entered incorrectly")
                ex.printStackTrace()
            }
            return User()
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return User()
}