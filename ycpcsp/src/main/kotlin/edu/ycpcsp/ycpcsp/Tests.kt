package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.Models.SecurityQuestionEnum
import edu.ycpcsp.ycpcsp.Models.User

/**
 *  Class that is used to test (NOT unit test) class functionality to demonstrate Kotlin capabilities
 */

class Tests

    fun main(args : Array<String>){
        // create user and print contents formatted as string
        var user = User("Josh", "Gross", "jgross11@ycp.edu", "123123123", "York College of Pennsylvania")
        println(user.toString())

        // print a specific security question
        println("${SecurityQuestionEnum.PET.question}\n")

        // print all security questions
        for (sq in SecurityQuestionEnum.values()){
            println(sq.question)
        }


    }