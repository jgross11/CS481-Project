package edu.ycpcsp.ycpcsp.PostDataClasses

class LoginFormData (var username : String, var password : String){
    override fun toString(): String {
        return "$username | $password"
    }
}