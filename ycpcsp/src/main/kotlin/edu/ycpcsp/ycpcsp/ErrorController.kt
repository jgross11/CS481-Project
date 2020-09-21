package edu.ycpcsp.ycpcsp


import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.ModelAndView

/**
 * ErrorController
 * Handles the case in which a user attempts to go to a webpage that doesn't exist
 */

@RestController
class ErrorController : ErrorController {

    // if a webpage doesn't exist, the user is sent to /error
    @RequestMapping("/error")
    fun handleError(): ModelAndView {
        println("User attempted to navigate to a page that doesn't exist")
        val modelAndView = ModelAndView()
        // return error webpage
        modelAndView.viewName = "error.html"
        println("Sending user to error page...")
        return modelAndView
    }

    override fun getErrorPath(): String {
        return "An error occurred..."
    }
}