package edu.ycpcsp.ycpcsp.PostDataClasses

class EditUserFormData (var firstName: String,
                        var lastName: String,
                        var password: String,
                        var school: String,
                        var email: String

){
    
    override fun toString(): String {
        return "$firstName $lastName | $school\n$email, $password"
    }
}

