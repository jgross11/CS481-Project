
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
    var testUser = loadUser(email)
    var testCompare : Array<String> = arrayOf("Test", "Name", "test@test.com","test-inc")
    println("=============================Begin loadUser Test=============================")
    if(testUser != null) {
        assert(testUser.firstName.compareTo(testCompare[0]) == 0)
        assert(testUser.lastName.compareTo(testCompare[1]) == 0)
        assert(testUser.email.compareTo(testCompare[2]) == 0)
        assert(testUser.school.compareTo(testCompare[3]) == 0)
        println("loadUser works just fine")

    }
    println()
    println("=============================End loadUser Test=============================")
}
