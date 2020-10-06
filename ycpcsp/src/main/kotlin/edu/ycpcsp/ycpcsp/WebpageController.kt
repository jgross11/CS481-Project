package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.Models.*
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData2
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpSession


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
    fun testReceivingOfDataFromBackEndLongFunctionName(@RequestBody user : User, session : HttpSession) : User{
        println("Received following information")
        // should print the User Kotlin object .toString()
        // for an output like: username | password
        // println(loginFormData)

        // println(user.toString())

        // if we are sure we have a valid user object, we can query database, etc. and then return whatever result
        // to be interpreted by the front end
        if(user.firstName != "Josh") {
            println("making new user")
            var user = User("Josh", "Gross", "jgross11@ycp.edu", "123123123", "York College of Pennsylvania")
            var sq1 = SecurityQuestion(0, "Tippy")
            var sq2 = SecurityQuestion(1, "Wouldn't you like to know, weather boy?")
            var sq3 = SecurityQuestion(1, "Still not telling")
            user.securityQuestions[0] = sq1
            user.securityQuestions[1] = sq2
            user.securityQuestions[2] = sq3
            // create water object
            var water = ChemicalObject("H2O", 1.0f, 0.0f)

            // create beaker object
            var beaker = EquipmentObject("10mL Beaker")

            // create a step between water and a beaker
            var waterInBeakerStep = Step(1, water, beaker)
            var experiment = Experiment("Adding water to a beaker", user.getFullname(), "water, beaker", 1)
            experiment.addStep(waterInBeakerStep, 0)
            user.experiments[0] = experiment
            return user
        }
        return user
        /*
        return if(loginFormData.username == "atestuser" && loginFormData.password == "atestpass"){
            session.setAttribute("username", loginFormData.username)
            session.setAttribute("password", loginFormData.password)
            true
        }
        else{
            false
        }*/
    }

    @GetMapping("/receiveData2")
    fun sendReceiveDataPage2() : String{
        return "receiveData2.html"
    }

    @PostMapping(path = ["/receiveData-submit2"], consumes = ["application/json"], produces = ["application/json"])

    @ResponseBody
    fun testReceivingOfDataFromBackEndLongFunctionName2(@RequestBody loginFormData2: LoginFormData2) : Boolean{
        println("Received following login information")

        println(loginFormData2)

        return (loginFormData2.username == "atestuser" && loginFormData2.password == "-823606258")
    }

}