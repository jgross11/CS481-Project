package edu.ycpcsp.ycpcsp.PostDataClasses

import edu.ycpcsp.ycpcsp.Models.SecurityQuestion

class SecurityQuestionAndEmail (var securityQuestion : SecurityQuestion, var email : String){
    override fun toString() : String{
        return "$email : ${securityQuestion.toString()}"
    }
}