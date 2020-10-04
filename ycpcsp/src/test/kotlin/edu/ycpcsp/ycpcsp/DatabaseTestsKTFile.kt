package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.LoadUser
import edu.ycpcsp.ycpcsp.DataBase.VerifyUser

fun main(){
    //TODO this section of code tests VerifyUser.kt
    val email = "test@test.com"
    val userPassword = "1234"
    println("=============================End VerifyUser Test=============================")
    if(VerifyUser(email, userPassword)){
        println("Test verifyUser is working")
    } else{
        println("Error verifyUser does not work")
    }
    println("=============================End VerifyUser Test=============================")

    //TODO this section of code tests LoadUser
    var userEntries : MutableList<String> = LoadUser(email)
    var testCompare : Array<String> = arrayOf("test", "Name", "test-inc")
    println("=============================Begin LoadUser Test=============================")
    if(userEntries.isNotEmpty()) {
        for (i in 0 until userEntries.size) {
            if (userEntries[i].compareTo(testCompare[i]) == 0) {
                print(" This is working ")
            } else {
                print(" not working ")
            }
        }
    }
    println()
    println("=============================End LoadUser Test=============================")
}

