package edu.ycpcsp.ycpcsp.WebControllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.ResponseBody

/**
 *  This class (will) handle the all GET and POSTS associated with
 *  the case in which a newly signed up user wishes to verify their
 *  identity in order to access full functionality of the website.
 */
@Controller
class VerifySignupController {

    // Attempts to verify a users' signup and redirects accordingly
    // TODO determine why this grabs html resources such as helperFunctions.js...
    @GetMapping("/verify/{userID}")
    fun simulation(@PathVariable(value="userID") id : String) : String{
        // TODO verify this verification link is still valid (user still in quarantine table, etc.)
        // TODO move user from quarantine to main user table if valid and send to home page
        // TODO send to bad-verification page if verification fails
        /*
        TODO change this function name accordingly
        if(verifySignup(id)){
            return "home.html"
        }
        else{
            return "bad-verification.html"
        }

         */

        println("Received verification ID: $id")
        return "/home.html"
    }
}