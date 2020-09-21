package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.Models.SecurityQuestionEnum
import edu.ycpcsp.ycpcsp.Models.User

/**
 *  Class that is used to test (NOT unit test) class functionality to demonstrate Kotlin capabilities
 */

class Tests

    fun main(args : Array<String>){
        // create user
        var user = User("Josh", "Gross", "jgross11@ycp.edu", "123123123", "York College of Pennsylvania")

        // print a specific security question
        println("${SecurityQuestionEnum.PET.question}\n")

        // print all security questions
        for (sq in SecurityQuestionEnum.values()){
            println(sq.question)
        }

        // create security question object and add to user
        var sq1 = SecurityQuestion(0, "Tippy")
        var sq2 = SecurityQuestion(1, "Wouldn't you like to know, weather boy?")
        var sq3 = SecurityQuestion(1, "Still not telling")
        user.securityQuestions[0] = sq1
        user.securityQuestions[1] = sq2
        user.securityQuestions[2] = sq3

        // print user information
        println(user.toString())
    }