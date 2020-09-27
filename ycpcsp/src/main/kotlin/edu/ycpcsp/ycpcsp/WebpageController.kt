package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


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
    @GetMapping("/signup")
    fun signup(): String {
        println("Sending user to signup page...")
        return "signup.html"
    }

    // sends recover info html file to user
    @GetMapping("/recoverinfo")
    fun recoverInfo() : String{
        println("Sending user to \"recover information\" page")
        return "recoverinfo.html"
    }

    // handles forgotten password form post
    @PostMapping(path = ["/forgot-password-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun receiveForgottenPasswordInformation(
            @RequestParam("email") email : String // email that was submitted
    ) : String {
        println("Received the following forgotten password information: ")
        println("email: $email")
        // TODO query for an email and process request
        return "redirect:/recoverinfo"
    }

    // handles forgotten email form post
    @PostMapping(path = ["/forgot-email-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun receiveForgottenEmailInformation(
            @RequestParam("sqResponse") sqResponse: String // email that was submitted
    ) : String {
        println("Received the following forgotten email information: ")
        println("security question response: $sqResponse")
        // TODO determine if given response is valid, process request
        return "redirect:/recoverinfo"
    }

    // handles signup submission post
    @PostMapping(path = ["/signup-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun receiveSignupFormInformation(@RequestParam("fname") firstName: String,   // first name that was submitted on form
                                     @RequestParam("lname") lastName: String,    // last name that was submitted on form
                                     @RequestParam("email") email: String,       // etc.
                                     @RequestParam("password") password: String,
                                     @RequestParam("school") school: String,
                                     @RequestParam("security-question-1") SQ1: String,
                                     @RequestParam("sec-que-1-answer") SQA1: String,
                                     @RequestParam("security-question-2") SQ2: String,
                                     @RequestParam("sec-que-2-answer") SQA2: String,
                                     @RequestParam("security-question-3") SQ3: String,
                                     @RequestParam("sec-que-3-answer") SQA3: String
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
            @RequestParam("email") email: String,
            @RequestParam("password") password: String

    ) : String {

        // print received information
        println("Received the following login information: ")
        println("email: $email")
        println("password: $password")

        // TODO verify information is correct, doesn't already exist, etc...

        // returns to home page
        return "redirect:/"
    }

    // simple demonstration of sending data to front end

    // send basic login form page upon request
    @GetMapping("/receiveData")
    fun sendReceiveDataPage() : String{
        return "receiveData.html"
    }

    // when user clicks submit button on 'form', sends username and password as json
    // this function will ultimately return json as well
    @PostMapping(path = ["/receiveData-submit"], consumes = ["application/json"], produces = ["application/json"])

    // indicates that returned value is converted into json
    @ResponseBody

    // @RequestBody user : User constructs a Kotlin User object from the components of the request body
    // which in this case is just what was submitted as json from the form
    // which in this case is something like
    // {username: [value], password: [value]}
    fun testReceivingOfDataFromBackEndLongFunctionName(@RequestBody loginFormData: LoginFormData) : Boolean{
        println("Received following login information")
        // should print the User Kotlin object .toString()
        // for an output like: username | password
        println(loginFormData)

        // if we are sure we have a valid user object, we can query database, etc. and then return whatever result
        // to be interpreted by the front end
        return loginFormData.username == "atestuser" && loginFormData.password == "atestpassword"
    }


}