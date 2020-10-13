// tests
package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.Models.*

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

    // create water object
    var water = ChemicalObject(101, 1.0f, 0.0f)

    // create beaker object
    var beaker = EquipmentObject(0, 0, 0)

    // create a step between water and a beaker
    var waterInBeakerStep = Step(1, 0, true, 0, false, 0)


    // print object information
    println(water.toString())
    println(beaker.toString())
    println(waterInBeakerStep.toString())

    // create experiment object
    var experiment = Experiment("Adding water to a beaker", user.getFullName())

    // demonstrate initialization of experiment yields null steps
    println("### PREPARE FOR ERROR MESSAGES AS DEFAULT EXPERIMENT IS PRINTED")
    println(experiment.toString())

    // populate experiment with step
    experiment.addStep(waterInBeakerStep, 0)

    // print full experiment information
    println(experiment.toString())

}