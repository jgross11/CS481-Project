package edu.ycpcsp.ycpcsp.WebControllers

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

    // given an email, obtains and returns a security question to be answered
    // in order to reset account password
    @PostMapping(path=["/forgot-password-email-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenPasswordInformation(@RequestBody email : String /*email that was submitted*/) : SecurityQuestion {
        println("Received the following forgotten password information: ")
        println("email: $email")
        // TODO query for an email, obtain and return a security question if the email is found
        // TODO otherwise, return a 'null' question
        var secQue = SecurityQuestion()


        return secQue
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
    fun receiveForgottenEmailInformation(@RequestBody data: ForgotEmailFormData) : Boolean {
        println("Received the following forgotten email information: ")
        println("name: $data")
        // TODO insert query to search for account given user name,
        // TODO return true if email found, false otherwise
        return true
    }
}