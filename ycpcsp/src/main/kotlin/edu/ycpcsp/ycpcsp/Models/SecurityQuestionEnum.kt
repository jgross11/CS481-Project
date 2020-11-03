package edu.ycpcsp.ycpcsp.Models


/**
 *  Enum class holding preset security questions

 *
 */

enum class SecurityQuestionEnum(val question : String){
    PET("What is the name of your first pet?"),
    SPORT("What is your favorite sport?"),
    ADDRESS("What is your first address?"),
    MOVIE("What is your favorite movie?"),
    MOTHER("What is your mothers name?"),
    SCHOOL("Where did you attend high school?"),
    FOOD("What is your favorite food?"),
    CAR("What was the make of your first car?"),
    WORK("What was your first job?"),
    BOOK("What is your favorite book?")
}
