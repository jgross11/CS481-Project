package edu.ycpcsp.ycpcsp.PostDataClasses

/**
 * Container class for the information received from the recover information form
 * to be used by recover information controller for convenience
 */
class ForgotEmailFormData (var firstName : String, var lastName : String){
    override fun toString(): String {
        return "$firstName $lastName"
    }
}