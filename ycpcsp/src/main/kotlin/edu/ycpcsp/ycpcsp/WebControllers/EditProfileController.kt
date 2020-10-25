package edu.ycpcsp.ycpcsp.WebControllers
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


/**
 *  This class handles all GET and POST interactions that regard the profile page.
 */
@Controller
class EditProfileController {

    // sends profile html file to user
    @GetMapping("/editprofile")
    fun sendHomePage(): String{
        println("Sending user to edit page...")
        return "editprofile.html"
    }
}