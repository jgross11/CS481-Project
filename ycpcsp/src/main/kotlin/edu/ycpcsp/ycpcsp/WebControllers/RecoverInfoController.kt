package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.LoadUser
import edu.ycpcsp.ycpcsp.DataBase.getSecurityQuestionByEmail
import edu.ycpcsp.ycpcsp.EmailSender
import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.PostDataClasses.ForgotEmailFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 *  This class handles all GET and POST interactions that regard the recover information page.
 */

@Controller
class RecoverInfoController {

    // sends recover info html file to user
    @GetMapping("/recoverinfo")
    fun sendRecoverInfoPage() : String{
        println("Sending user to \"recover information\" page")
        return "recoverinfo.html"
    }

    // given an email, searches DB for that email, sends a password recovery email if found
    // returns true if email is found in DB and password recovery email is sent, false otherwise
    @PostMapping(path=["/forgot-password-email-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenPasswordInformation(@RequestBody email : String /*email that was submitted*/) : Boolean {
        // TODO determine why spring / jackson / whoever is putting the string value in quotes
        val properEmail = email.substring(1, email.length-1)
        println(properEmail)
        println("Received email whose password is trying to be recovered: $properEmail")
        // TODO sloppy as entire user is loaded while only name, ID, email necessary, optimize
        var user = LoadUser(properEmail)
        return IsEmailInDB(properEmail) && EmailSender().sendForgotPasswordEmail(user)
    }

    // given a security question and answer, compare with the answer stored on the DB for the user
    @PostMapping(path=["/forgot-password-security-question-answer-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenPasswordSecurityQuestionAnswerInformation(@RequestBody questionAndAnswer : SecurityQuestion /*security question and answer submitted*/) : Boolean{
        // TODO add query to compare given answer with answer in DB, return true if match, false otherwise
        println(questionAndAnswer)
        return false
    }

    // given a name, checks for an email associated with that name.
    @PostMapping(path=["/forgot-email-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenEmailInformation(@RequestBody data: ForgotEmailFormData) : SecurityQuestion {
        // TODO query for email given first and last name

        // TODO query for a security question and answer given email

        // TODO otherwise, return a 'null' question
        /*
        val secQue = SecurityQuestion()
        val dbResult = getSecurityQuestionByEmail(email)
        if(dbResult != null){
            return dbResult
        }
*/
        return SecurityQuestion()
    }
}