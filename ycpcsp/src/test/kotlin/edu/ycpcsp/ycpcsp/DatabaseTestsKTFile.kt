package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.loadUser
import edu.ycpcsp.ycpcsp.DataBase.verifyUser

fun main(){
    //TODO this section of code tests verifyUser.kt
    val email = "test@test.com"
    val userPassword = "1234"
    println("=============================End verifyUser Test=============================")
    if(verifyUser(email, userPassword)){
        println("Test verifyUser is working")
    } else{
        println("Error verifyUser does not work")
    }
    println("=============================End verifyUser Test=============================")

    //TODO this section of code tests loadUser
    var userEntries : MutableList<String> = loadUser(email)
    var testCompare : Array<String> = arrayOf("test", "Name", "test-inc")
    println("=============================Begin loadUser Test=============================")
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
    println("=============================End loadUser Test=============================")
}

