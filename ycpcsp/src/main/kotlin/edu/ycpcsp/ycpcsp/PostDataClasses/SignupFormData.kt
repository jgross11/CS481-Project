package edu.ycpcsp.ycpcsp.PostDataClasses

class SignupFormData (var username : String,
                      var password : String

){
    override fun toString(): String {
        return "$username | $password"
    }
}