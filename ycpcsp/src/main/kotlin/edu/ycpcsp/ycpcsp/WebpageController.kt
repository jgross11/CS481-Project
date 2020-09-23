package edu.ycpcsp.ycpcsp

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.servlet.ModelAndView
import javax.servlet.http.HttpServletRequest


/**
 * WebpageController
 * Supplies user with appropriate webpage redirects (except for error handling)
 */

@Controller
class WebpageController {

    // sends homepage html file to user
    @GetMapping("/", "/home")
    fun home(): String{
        println("Sending user to home page...")
        return "home.html"
    }

    // sends signup html file to user
    @GetMapping("signup")
    fun signup(): String {
        println("Sending user to signup page...")
        return "signup.html"
    }

    // handles signup submission post
    @PostMapping(path = ["/signup-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun addMember(@RequestParam("fname")  firstName : String,   // first name that was submitted on form
                  @RequestParam("lname")  lastName : String,    // last name that was submitted on form
                  @RequestParam("email")  email : String,       // etc.
                  @RequestParam("password")  password : String,
                  @RequestParam("school")  school : String,
                  @RequestParam("security-question-1")  SQ1 : String,
                  @RequestParam("sec-que-1-answer")  SQA1 : String,
                  @RequestParam("security-question-2")  SQ2 : String,
                  @RequestParam("sec-que-2-answer")  SQA2 : String,
                  @RequestParam("security-question-3")  SQ3 : String,
                  @RequestParam("sec-que-3-answer")  SQA3 : String
                  ) : String {

        // print received information
        println("Received the following signup information: ")
        println("First name: $firstName")
        println("Last name: $lastName")
        println("email: $email")
        println("password: $password")
        println("School: $school")
        println("Security Question 1: $SQ1")
        println("Security Question 1 Answer: $SQA1")
        println("Security Question 2: $SQ2")
        println("Security Question 2 Answer: $SQA2")
        println("Security Question 3: $SQ3")
        println("Security Question 3 Answer: $SQA3")

        // TODO verify information is correct, doesn't already exist, etc...

        // TODO return to correct page i.e. to successful creation if successful, back to signup with error messages if not

        // returns to home page
        return "redirect:/"
    }
    @PostMapping(path = ["/login-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun login(
                  @RequestParam("email")  email : String,
                  @RequestParam("password")  password : String

    ) : String {

        // print received information
        println("Received the following login information: ")
        println("email: $email")
        println("password: $password")

        // TODO verify information is correct, doesn't already exist, etc...

        // TODO return to correct page i.e. to successful creation if successful, back to signup with error messages if not

        // returns to home page
        return "redirect:/"
    }

}