package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.CreateQuarantineUser
import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import edu.ycpcsp.ycpcsp.DataBase.isEmailInQuarantineDB
import edu.ycpcsp.ycpcsp.EmailSender
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 *  This class handles all GET and POST interactions that regard the signup page.
 */

@Controller
class SignupController {

    // sends signup html file to user
    @GetMapping("/signup")
    fun sendSignupPage(): String {
        println("Sending user to signup page...")
        return "signup.html"
    }


    // given signup form data, attempt to add user to DB
    // return User object containing form data if user added,
    // 'null' User if not to indicate failed signup (already in DB),
    // couldn't load info into DB, etc.
    @PostMapping(path = ["/signup-submit"], consumes = ["application/json"])
    @ResponseBody
    fun receiveSignupFormInformation(@RequestBody signupFormData : SignupFormData) : User {
        // print received information
        println("Received the following signup information: ")
        println(signupFormData)
        var user = User()

        // check if email not in DB
        if(!IsEmailInDB(signupFormData.email) && !isEmailInQuarantineDB(signupFormData.email)){
            // ensure name is capitalized
            println("user not in DB, adding")
            signupFormData.firstName = signupFormData.firstName.capitalize()
            signupFormData.lastName = signupFormData.lastName.capitalize()

            // insert into DB if email not found
            val newID = CreateQuarantineUser(signupFormData)
            if(newID != -1){
                user.setContentsFromForm(signupFormData)
                user.isQuarantined = true
                println("new user successfully added to quarantine DB")
                user.id = newID
                if(EmailSender().sendSignupEmail(user)){
                    println("Verification email sent successfully!")
                } else{
                    println("Could not send verification email")
                }

            } else{
                println("unable to add user to quarantine DB")
            }
        }else{
            println("email already in quarantine DB")
        }
        // returns to home page
        return user
    }
}