package edu.ycpcsp.ycpcsp


import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class MyErrorController : ErrorController {
    @RequestMapping("/error")
    fun handleError(): String {
        //do something like logging
        return "How'd you get here? <br> <a href=\"\\\"> Go home. "
    }

    override fun getErrorPath(): String {
        return ""
    }
}