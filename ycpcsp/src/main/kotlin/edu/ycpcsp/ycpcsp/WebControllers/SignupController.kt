package edu.ycpcsp.ycpcsp.WebControllers

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
    // 'null' User if not to indicate failed signup (already in DB)
    @PostMapping(path = ["/signup-submit"], consumes = ["application/json"])
    @ResponseBody
    fun receiveSignupFormInformation(@RequestBody signupFormData : SignupFormData) : User {

        // print received information
        println("Received the following signup information: ")
        println(signupFormData)
        var user = User()
        // TODO verify information is correct, doesn't already exist, etc...

        // returns to home page
        return user
    }
}