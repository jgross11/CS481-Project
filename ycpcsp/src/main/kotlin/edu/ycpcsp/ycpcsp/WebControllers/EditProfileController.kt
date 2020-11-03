package edu.ycpcsp.ycpcsp.WebControllers
import edu.ycpcsp.ycpcsp.DataBase.IsEmailInDB
import edu.ycpcsp.ycpcsp.DataBase.ModifyUser
import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
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
    fun receiveEditFormInformation(@RequestBody editUserFormData : EditUserFormData) : User {
        // print received information
        println(editUserFormData)

        var user = User()

        // check if email not in DB
        if(IsEmailInDB(editUserFormData.email)){
            // ensure name is capitalized
            println("Edit")
            editUserFormData.firstName = editUserFormData.firstName.capitalize()
            editUserFormData.lastName = editUserFormData.lastName.capitalize()
            if(ModifyUser(editUserFormData)){
                user.setContentsFromEdit(editUserFormData)
                println("Edit successfully added to DB")
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