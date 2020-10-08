package edu.ycpcsp.ycpcsp.WebControllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam

@Controller
class RecoverInfoController {

    // sends recover info html file to user
    @GetMapping("/recoverinfo")
    fun recoverInfo() : String{
        println("Sending user to \"recover information\" page")
        return "recoverinfo.html"
    }

    // handles forgotten password form post
    @PostMapping(path=["/forgot-password-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun receiveForgottenPasswordInformation(
            @RequestParam("email") email : String // email that was submitted
    ) : String {
        println("Received the following forgotten password information: ")
        println("email: $email")
        // TODO query for an email and process request
        return "redirect:/recoverinfo"
    }

    // handles forgotten email form post
    @PostMapping(path=["/forgot-email-submit"], consumes = ["application/x-www-form-urlencoded"])
    fun receiveForgottenEmailInformation(
            @RequestParam("sqResponse") sqResponse : String // email that was submitted
    ) : String {
        println("Received the following forgotten email information: ")
        println("security question response: $sqResponse")
        // TODO determine if given response is valid, process request
        return "redirect:/recoverinfo"
    }
}