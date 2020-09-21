package edu.ycpcsp.ycpcsp.Models

data class SecurityQuestion(var questionIndex : Int, var answer : String) {
    var question : String = ""

    constructor() : this(-1, ""){
        answer = ""
    }
    init{
        if(questionIndex != -1)
            question = SecurityQuestionEnum.values()[questionIndex].question
        else
            question = ""
    }

    override fun toString() : String{
        return "$question | $answer"
    }
}