package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.LoadUser
import edu.ycpcsp.ycpcsp.DataBase.getSecurityQuestionByEmail
import edu.ycpcsp.ycpcsp.DataBase.verifySecurityQuestionAnswer
import edu.ycpcsp.ycpcsp.EmailSender
import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.PostDataClasses.ForgotEmailFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SecurityQuestionAndEmail
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

    // given an email, searches DB for that email, returns one of the users' security questions
    // if email is valid, null otherwise
    @PostMapping(path=["/forgot-password-email-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenPasswordInformation(@RequestBody email : String /*email that was submitted*/) : SecurityQuestion {
        // TODO determine why spring / jackson / whoever is putting the string value in quotes
        val properEmail = email.substring(1, email.length-1)
        println(properEmail)
        println("Received email whose password is trying to be recovered: $properEmail")
        if(IsEmailInDB(properEmail)) {
            // if email is in DB this will never be null
            return getSecurityQuestionByEmail(properEmail)!!
        }
        return SecurityQuestion()
    }

    // given a security question and answer, compare with the answer stored on the DB for the user
    @PostMapping(path=["/forgot-password-security-question-answer-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun receiveForgottenPasswordSecurityQuestionAnswerInformation(@RequestBody questionAndEmail : SecurityQuestionAndEmail) : Boolean{
        return verifySecurityQuestionAnswer(questionAndEmail)
    }
}