package edu.ycpcsp.ycpcsp.PostDataClasses

class SignupFormData (var firstName : String,
                      var lastName : String,
                      var email : String,
                      var password : String,
                      var school : String,
                      var sq1 : String,
                      var sq1a : String,
                      var sq2 : String,
                      var sq2a : String,
                      var sq3 : String,
                      var sq3a : String

){
    override fun toString(): String {
        return "$firstName $lastName | $school\n$email, $password\n$sq1: $sq1a\n$sq2: $sq2a\n$sq3: $sq3a"
    }
}