package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.DeleteUser
import edu.ycpcsp.ycpcsp.DataBase.UserSignup
import java.util.Scanner

fun main(){

    //reader for input values
    val reader = Scanner(System.`in`)

    print("Which function do you want to use 1(delete user) or 2(user signup): ")
    val answer: Int = reader.nextInt()

    if(answer == 1){
        print("Enter in the user id that you wish to delete: ")
        val id = readLine()
        DeleteUser(id)
    }

    else {
    print("Enter in the user id that you wish to delete: ")
    val id = readLine()
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
        UserSignup(2, firstName!!, lastName!!, email!!, password!!, organization!!, question1!!, question2!!, question3!!, ans1!!, ans2!!, ans3!!)
    }
}
