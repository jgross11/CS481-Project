package edu.ycpcsp.ycpcsp.Models

/**
 * This class contains a security question and its corresponding answer
 * The default constructor is given the index of the question in
 * SecurityQuestionEnum and an answer
 */
data class SecurityQuestion(var questionIndex : Int, var answer : String) {
    var question : String = ""
    var indexInDB = -1


    // 'null' constructor
    constructor() : this(-1, ""){}

    // indexInDB constructor
    constructor(questionIndex : Int, answer : String, indexInDB : Int) : this(questionIndex, answer){
        this.indexInDB = indexInDB
    }

    // if a valid question index is given, fetch and store the question
    init{
        question = if(questionIndex != -1)
            SecurityQuestionEnum.values()[questionIndex].question
        else
            ""
    }


    // constructor used when only question index is known
    constructor(questionIndex : Int) : this(questionIndex, ""){}

    override fun toString() : String{
        return "questionIndex=$questionIndex, indexInDB=$indexInDB : $question | $answer"
    }
}