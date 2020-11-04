package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.EmailSender
import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.PostDataClasses.ForgotEmailFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SecurityQuestionAndEmail
import edu.ycpcsp.ycpcsp.PostDataClasses.UserIDAndPassword
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.net.PasswordAuthentication

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
        println("received following response: ${questionAndEmail.toString()}")
        return verifySecurityQuestionAnswer(questionAndEmail)
    }

    // send-password-recovery-email
    // given a user's email, send a password recovery email
    @PostMapping(path=["/send-password-recovery-email"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun sendRecoveryEmail(@RequestBody email : String /*email that was submitted*/) : Boolean {
        // TODO determine why spring / jackson / whoever is putting the string value in quotes
        val properEmail = email.substring(1, email.length-1)
        println("Received email to send recovery to: $properEmail")
        val user = LoadUser(properEmail)
        return if(user.firstName != ""){
            val recoveryKey = createRecoveryKeyByID(user.id)
            if(recoveryKey != -1) {
                // TODO this is dirty and deceptive, a tragedy within the CS department
                // TODO however it works for now and we're on a time crunch
                // TODO DO NOT CONFLATE USER ID WITH RECOVERY ID EVERY AGAIN
                user.id = recoveryKey
                return if (EmailSender().sendForgotPasswordEmail(user)) {
                    println("recovery email sent")
                    true
                } else {
                    println("could not send recovery email")
                    false
                }
            } else{
                false
            }
        }
        else{
            println("user could not be loaded...")
            false
        }
    }

    @PostMapping(path=["/submit-new-password"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun updatePassword(@RequestBody userIDAndPassword : UserIDAndPassword) : Boolean {
        println("received userID / password: ${userIDAndPassword.toString()}")
        return if(updatePasswordByUserID(userIDAndPassword)){
            return if(removeRecoveryIDByUserID(userIDAndPassword.userID)){
                println("Updated password and removed recovery")
                true
            } else{
                println("Updated password but couldn't remove from DB")
                true
            }
        }
        else{
            println("Could not update password")
            false
        }
    }

    // TODO extract user's userID from link, send back textfield and button (TODOTODO make html page)
    // TODO that will update the users' password once submitted on FE
    @GetMapping("/recoverPassword/{userID}")
    @ResponseBody
    fun recoverPasswordField(@PathVariable("userID") id : Int) : String {
        println("Received user who wants to recover password with recoveryID of: $id")
        val user = getUserByRecoveryKeyID(id)
        println(user.toString())
        // TODO make this not suck
        if(user.id != -1) {
            return "<script src=\"/../helperFunctions.js\"></script>" +
                    "<script src=\"https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.12.0/js/md5.min.js\"></script>" +
                    "<label for=\"newPassword\">Enter new password:</label><br>\n" +
                    "<div id=\"newPassword-error\"></div><br>\n" +
                    "<input type=\"password\" id=\"newPassword\" name=\"newPassword\"><br>\n" +
                    "<input value=\"Change password\" type=\"button\" id=\"changePasswordButton\" name=\"changePasswordButton\" onclick=\"verifyChangePassword()\">\n" +
                    "<script>\n" +
                    "function verifyChangePassword(){\n" +
                    "            let userID = ${user.id};\n" +
                    "            let passwordValue = document.getElementById(\"newPassword\").value\n" +
                    "                if(passwordValue.length > 0){\n" +
                    "                    let group = {\n" +
                    "                    userID: userID,\n" +
                    "                    password: md5(passwordValue)\n" +
                    "                };\n" +
                    "               console.log(group)\n" +
                    "                postData(\"/../submit-new-password\", group).then(function(data){\n" +
                    "                    if(data){\n" +
                    "                        window.location.href = \"/\";\n" +
                    "                    } else{\n" +
                    "                        document.getElementById(\"newPassword-error\").innerHTML = \"Could not update password, please try again later.\";\n" +
                    "                    }\n" +
                    "                });\n" +
                    "                           } else{\n" +
                    "                   document.getElementById(\"newPassword-error\").innerHTML = \"Please enter a valid password.\";\n" +
                    "            }\n" +
                    "        }\n" +
                    "</script>"
        }
        else{
            return "<script>\n" +
                    "            window.location.href = \"/\";\n" +
                    "         </script>"
        }

        /**
         <script>
            window.location.href = "/";
         </script>
        function verifyChangePassword(){
            let userID = ${user.id};
            let passwordValue = document.getElementById("newPassword").value
            if(passwordValue.length > 0){
                let group = {
                    userID: userID,
                    password: passwordValue
                };
                console.log(group)
                postData('submit-new-password', group).then(function(data){
                    if(data){
                        window.location.href = "/";
                    } else{
                        document.getElementById("newPassword-error").innerHTML = "Could not update password, please try again later.";
                    }
                });
            } else{
                document.getElementById("newPassword-error").innerHTML = "Please enter a valid password.";
            }
        }
         */
    }

}