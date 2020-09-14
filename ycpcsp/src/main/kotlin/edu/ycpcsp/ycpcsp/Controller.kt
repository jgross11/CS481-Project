package edu.ycpcsp.ycpcsp

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class Controller {

    @GetMapping("/")
    fun home(): String{
        return "Welcome to the home page"
    }

    @GetMapping("/greet")
    fun greet(): String {
        return "Hello, World"
    }
/*
    @GetMapping("/error")
    fun returnError() : String {
        return "WARNING"
    }*/
}