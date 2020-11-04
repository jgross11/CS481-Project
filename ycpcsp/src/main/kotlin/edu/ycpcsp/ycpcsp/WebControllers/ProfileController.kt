package edu.ycpcsp.ycpcsp.WebControllers
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


/**
 *  This class handles all GET and POST interactions that regard the profile page.
 */
@Controller
class ProfileController {

    // sends profile html file to user
    @GetMapping("/profile")
    fun sendHomePage(): String{
        println("Sending user to profile page...")
        return "profile.html"
    }
}