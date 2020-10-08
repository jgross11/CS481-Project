package edu.ycpcsp.ycpcsp.PostDataClasses

/**
 * Container class for the information received from the login form
 * to be used by login controller for convenience
 */
class LoginFormData (var email : String, var password : String){
    override fun toString(): String {
        return "$email | $password"
    }
}