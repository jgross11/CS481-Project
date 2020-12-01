package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import java.sql.SQLException
import java.sql.Statement


fun CreateAdminUser(signupFormData: SignupFormData): Int {
    val connection = getDBConnection()
    try{
       if(connection != null) {
           var preparedSt = connection.prepareStatement("INSERT INTO Database.Admin_Users (firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3) " +
                   "VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS)
           preparedSt.setString(1, signupFormData.firstName)
           preparedSt.setString(2, signupFormData.lastName)
           preparedSt.setString(3, signupFormData.email)
           preparedSt.setString(4, signupFormData.password)
           preparedSt.setString(5, signupFormData.school)
           preparedSt.setInt(6, signupFormData.sq1)
           preparedSt.setInt(7, signupFormData.sq2)
           preparedSt.setInt(8, signupFormData.sq3)
           preparedSt.setString(9, signupFormData.sq1a)
           preparedSt.setString(10, signupFormData.sq2a)
           preparedSt.setString(11, signupFormData.sq3a)

           preparedSt.executeUpdate()
           val rs = preparedSt.generatedKeys
           return if (rs.next()) {
               rs.getInt(1)
           } else {
               -1
           }
       }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
        return -1
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
        return -1
    }

    return -1
}

/**
 *  Given a admin user's auID, attempts to fetch all admin user information
 *  userID: the auID of the admin user
 *  return: a populated User object if the auID is exists, a null User otherwise
 */
fun loadAdminUserByID(userID : String) : User{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Admin_Users WHERE auID = ?;")
            preparedStatement.setString(1, userID)

            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                val user = User(rs.getString(FirstName),rs.getString(LastName),rs.getString(Email),rs.getString(Password),rs.getString(School), rs.getInt(ID))
                user.securityQuestions = Array<SecurityQuestion>(3){SecurityQuestion()}
                user.securityQuestions[0] = SecurityQuestion(rs.getInt(7), rs.getString(10),1)
                user.securityQuestions[1] = SecurityQuestion(rs.getInt(8), rs.getString(11),2)
                user.securityQuestions[2] = SecurityQuestion(rs.getInt(9), rs.getString(12),3)
                user
            } else{
                User()
            }

        } catch(ex : SQLException){
            ex.printStackTrace()
            User()
        }
    }
    return User()
}

fun LoadAdminUser(email: String): User{
    val connection = getDBConnection()

    try {
        if(connection != null) {
            var prepareSt = connection.prepareStatement("SELECT * FROM Database.Admin_Users where email = ?;")
            prepareSt.setString(1, email)
            val rs = prepareSt.executeQuery()

            try {
                return if (rs.first()) {
                    val user = User(rs.getString(FirstName), rs.getString(LastName), rs.getString(Email), rs.getString(Password), rs.getString(School), rs.getInt(ID))
                    user.securityQuestions = Array<SecurityQuestion>(3) { SecurityQuestion() }
                    user.securityQuestions[0] = SecurityQuestion(rs.getInt(7), rs.getString(10), 1)
                    user.securityQuestions[1] = SecurityQuestion(rs.getInt(8), rs.getString(11), 2)
                    user.securityQuestions[2] = SecurityQuestion(rs.getInt(9), rs.getString(12), 3)
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

fun DeleteAdminUser(user: User): Boolean{
    //This method is done when we simply want to delete a quarantine user
    //Currently it will only delete a single user with the same email address
    val connection = getDBConnection()
    try{
        if(connection != null) {
            var preparedSt = connection.prepareStatement("DELETE FROM Database.Admin_Users WHERE auID = ?")
            preparedSt.setInt(1, user.id)
            preparedSt.executeUpdate()

            //returns true when it has successfully deleted quarantine user
            return true
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return false
}