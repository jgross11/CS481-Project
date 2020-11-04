package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.PostDataClasses.SecurityQuestionAndEmail
import java.sql.SQLException

fun verifySecurityQuestionAnswer(securityQuestionAndEmail: SecurityQuestionAndEmail) : Boolean{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT UserID FROM Database.Users where (email = '${securityQuestionAndEmail.email}' and ans${securityQuestionAndEmail.securityQuestion.indexInDB} = ?)")
            preparedStatement.setString(1, securityQuestionAndEmail.securityQuestion.answer)
            val rs = preparedStatement.executeQuery()
            rs.first()

        } catch(ex : SQLException){
            ex.printStackTrace()
            false
        }
    }
    return false
}