package edu.ycpcsp.ycpcsp.Models


/**
 *  Enum class holding preset security questions
 *  TODO add more questions
 */

enum class SecurityQuestionEnum(val question : String){
    PET("What is the name of your first pet?"),
    ADDRESS("What is your first address?")
}