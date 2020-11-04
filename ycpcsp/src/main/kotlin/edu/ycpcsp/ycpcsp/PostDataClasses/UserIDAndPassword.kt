package edu.ycpcsp.ycpcsp.PostDataClasses

class UserIDAndPassword (var userID : Int, var password: String){
    override fun toString() : String{
        return "$userID : $password"
    }
}