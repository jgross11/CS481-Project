package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
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

    else if (answer == 2) {
    print("Enter in the user id that you wish to add: ")
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
        // TODO fix / get rid of this
        //UserSignup(2, firstName!!, lastName!!, email!!, password!!, organization!!, question1!!, question2!!, question3!!, ans1!!, ans2!!, ans3!!)
    }

    else if (answer == 3){
        print("Enter in the user id that you wish to lookup: ")
        val id = readLine()
        UserProfile(id)
    }

    else if (answer == 4){
        print("Enter username: ")
        val username = readLine()
        print("Enter password: ")
        val password = readLine()

        // TODO fix / get rid of this
        //VerifyUser(username!!, password!!)
    }

    else if (answer == 5){
        print("Enter in the search result: ")
        val search = readLine()
        val searchData = SearchFormData(search!!)
        val result = SearchExperiment(searchData)
        print(result)
    }
}

