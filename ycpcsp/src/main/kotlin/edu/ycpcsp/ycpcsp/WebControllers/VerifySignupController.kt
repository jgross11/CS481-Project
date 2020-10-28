package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.DeQuarantineUser
import edu.ycpcsp.ycpcsp.DataBase.loadQuarantineUserByID
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

/**
 *  This class (will) handle the all GET and POSTS associated with
 *  the case in which a newly signed up user wishes to verify their
 *  identity in order to access full functionality of the website.
 */
@Controller
class VerifySignupController {

    // Attempts to verify a users' signup and redirects accordingly
    // TODO determine a way to distinguish between a valid and invalid verification attempt
    // TODO and indicate this on the FE, rather than always redirecting to home page.
    @GetMapping("/verify/{userID}")
    fun simulation(@PathVariable("userID") id : String) : String{
        println("Received verification ID: $id")
        val user = loadQuarantineUserByID(id)
        if(user.firstName != ""){
            println("user in quarantine table")
            if(DeQuarantineUser(user)){
                println("user moved from quarantine to normal table")
            } else{
                println("could not move user from quarantine to normal table")
            }
        }
        else{
            println("user not in quarantine table")
        }
        return "redirect:/"
    }
}