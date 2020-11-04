package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Compound
import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import java.sql.SQLException

// security question DB indices
const val securityQuestionQuestionIndex = 1
const val securityQuestionAnswerIndex = 2

/**
 *  Given an email, query the DB for a random security question index and its answer.
 *  email - the email whose security question index / answer will be searched for
 *  return - a SecurityQuestion containing the question and answer if email in DB, null otherwise.
 */
fun getSecurityQuestionByEmail(email : String) : SecurityQuestion?{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val randIndex = (1..3).random()
            val questionIndex = "question$randIndex"
            val answerIndex = "ans$randIndex"
            val preparedStatement = connection.prepareStatement("SELECT question$randIndex, ans$randIndex FROM Database.Users WHERE email=?")
            preparedStatement.setString(1, email)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                // do not provide answer
                SecurityQuestion(rs.getInt(1), "", randIndex)
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