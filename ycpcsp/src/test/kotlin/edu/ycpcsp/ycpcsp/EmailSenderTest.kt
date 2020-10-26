package edu.ycpcsp.ycpcsp
import edu.ycpcsp.ycpcsp.Models.User


fun main(args : Array<String>){
    var user = User()
    println("Enter first name")
    user.firstName = readLine()!!
    println("Enter last name")
    user.lastName = readLine()!!
    println("Enter email")
    user.email = readLine()!!
    println("Enter ID")
    user.id = readLine()!!.toInt()
    println("Was signup email sent? ${EmailSender().sendSignupEmail(user)}")
}