package edu.ycpcsp.ycpcsp.WebControllers
import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.ModifyUser
import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
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

    @PostMapping(path = ["/edit-submit"], consumes = ["application/json"])
    @ResponseBody
    fun receiveEditFormInformation(@RequestBody user : User) : User {
        // print received information

        var user = User()

        // check if email not in DB
        if(!IsEmailInDB(user.email)){
            // ensure name is capitalized
            println("user not in DB, adding")
            user.firstName = user.firstName.capitalize()
            user.lastName = user.lastName.capitalize()

            // insert into DB if email not found
            if(ModifyUser(user)){
                println("new edit successfully added to DB")
            } else{
                println("unable to edit user to DB")
            }
        }else{
            println("Failed to edit into DB")
        }
        // returns to home page
        return user
    }
}