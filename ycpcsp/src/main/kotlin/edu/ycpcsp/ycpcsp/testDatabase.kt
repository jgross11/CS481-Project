package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import java.util.Properties
import java.sql.*

fun main(){
    val id: Int = 1;
    print("First Name: ")
    val firstName = readLine()
    print("Last Name: ")
    val lastName = readLine()
    print("Email Address: ")
    val email = readLine()
    print("Password: ")
    val password = readLine()
    print("Organization: ")
    val organization = readLine()
    print("Security Question 1: ")
    val question1 = readLine()
    print("Security Question 2: ")
    val question2 = readLine()
    print("Security Question 3: ")
    val question3 = readLine()
    print("Ans1: ")
    val ans1 = readLine()
    print("Ans2: ")
    val ans2 = readLine()
    print("Ans3: ")
    val ans3 = readLine()


    UserSignup(id, firstName!!, lastName!!, email!!, password!!, organization!!, question1!!, question2!!, question3!!, ans1!!, ans2!!, ans3!!)
}