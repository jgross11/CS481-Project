package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.RecentExperimentLoad
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


/**
 *  This class handles all GET and POST interactions that regard the home page.
 */
@Controller
class HomeController {

    // sends homepage html file to user
    @GetMapping("/", "/home")
    fun sendHomePage(): String{
        println("Sending user to home page...")
        return "home.html"
    }

    // given the login form data via a POST as JSON, verify user exists in DB
    // returns the appropriate User object to frontend as JSON if the user exists in the database,
    // null otherwise to indicate a failed login
    @PostMapping(path = ["/login-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun attemptToLogin(@RequestBody loginFormData: LoginFormData) : User {
        println("Received following login information")
        println(loginFormData)
        var user = User()
        // check if given information matches a user in DB

        if(VerifyUser(loginFormData)){
            // TODO construct user object from the appropriate DB query

            // TODO this is currently only half done...
            println("normal login successful")
            return LoadUser(loginFormData.email)
        } else if(verifyQuarantineUser(loginFormData)){
            println("quarantine login successful")
            user = LoadQuarantineUser(loginFormData.email)
            user.isQuarantined = true
            return user
        }

        // return constructed user object, or null, to indicate no user was found (login failed)
        return user
    }

    @PostMapping(path = ["/Recent-experiment"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun recentExperimentSearch(@RequestBody userid: Int): ArrayList<String> {
        println("Loading Users Recent Experiments")
        println(userid)
        var ListOfRecent = arrayListOf<String>()
        //ListOfRecent = RecentExperimentSearch(userid);
        //println(ListOfRecent[0])

        //For Now Here Is a fake one


        return ListOfRecent;
    }

    @PostMapping(path = ["/Playlist"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun playlistFetch(@RequestBody userid: Int): ArrayList<String> {
        println("Loading Users Playlist")
        println(userid)
        var ListOfRecent = arrayListOf<String>()
        //ListOfRecent = PlaylistSearch(userid);
        //println(ListOfRecent[0])
        println(userid)
        var ListOfRecentPlaylist  = PlaylistSearch(userid)
        println(ListOfRecentPlaylist)
        //For Now Here Is a fake one
        return ListOfRecent;
    }

}