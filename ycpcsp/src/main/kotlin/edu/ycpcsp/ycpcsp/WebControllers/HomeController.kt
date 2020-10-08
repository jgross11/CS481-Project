package edu.ycpcsp.ycpcsp.WebControllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class HomeController {
    // sends homepage html file to user
    @GetMapping("/", "/home")
    fun home(): String{
        println("Sending user to home page...")
        return "home.html"
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

        // returns to home page
        return "redirect:/"
    }
}