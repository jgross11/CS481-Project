package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.LoadUser
import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 *  This class handles all GET and POST interactions that regard the search page.
 */

@Controller
class SearchController {
    //send search html file to user
    @GetMapping("/SearchPage")
    fun sendSearchPage(): String {
        println("Sending user to search page...")
        return "SearchPage.html"
    }

    //given what the user searches for paste what information they want.
}