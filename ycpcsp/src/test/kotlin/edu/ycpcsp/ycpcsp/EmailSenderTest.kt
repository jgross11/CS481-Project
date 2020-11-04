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
    println("sending signup email with given information...")
    println("Was signup email sent? ${EmailSender().sendSignupEmail(user)}")
    println("sending recover password email with given information...")
    println("Was recover password email sent? ${EmailSender().sendForgotPasswordEmail(user)}")
}