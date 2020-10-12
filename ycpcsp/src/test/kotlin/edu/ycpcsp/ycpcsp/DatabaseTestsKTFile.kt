
package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.Models.*

fun main(){
    //TODO this section of code tests VerifyUser.kt
    var email = "test@test.com"
    var userPassword = "1234"
    println("=============================Begin VerifyUser Test=============================")
    if(VerifyUser(email, userPassword)){
        println("Test VerifyUser is working")
    } else{
        println("Error VerifyUser does not work")
    }
    println("=============================End VerifyUser Test=============================")

    //TODO this section of code tests LoadUser
    println("=============================Begin LoadUser Test=============================")

    var testUser = LoadUser(email)
    var testCompare : Array<String> = arrayOf("Test", "Name", "test@test.com","test-inc")
    if(testUser != null) {
        assert(testUser.firstName.compareTo(testCompare[0]) == 0)
        assert(testUser.lastName.compareTo(testCompare[1]) == 0)
        assert(testUser.email.compareTo(testCompare[2]) == 0)
        assert(testUser.school.compareTo(testCompare[3]) == 0)
        println("LoadUser works just fine")

    }
    println()
    println("=============================End LoadUser Test=============================")

    //TODO ModifyUser test
    println("=============================Begin Modify User Test=============================")

    var originalUser = LoadUser(email)
    var modifyUser = User("Firstname", "Lastname", "test@test.com", "1234", "TheBest")
    if(ModifyUser(modifyUser)){
        if(originalUser != null){
            //if you wish to verify whether or not the ModifyUser is actually working comment out the line below
            ModifyUser(originalUser)
        }
        println("Modify User successfully ran")
    } else{
        println("Modify User did not successfully run")
        println("Double check the database table to make sure the data is not corrupted")
    }
    println("=============================End Modify User Test=============================")
    //Todo Security Question Answer Verification Test

    println("=============================Begin Security Question Answer Test=============================")
    val secQuestion1 = SecurityQuestion(1,"test")
    val secQuestion2 = SecurityQuestion(1, "wrong")

    //This should run a correct test
    if(verifySecurityQuestion(email,secQuestion1)){
        println("Security Question 1's answer was the correct")
    } else{
        println("Security Quesition 1's answer was incorrect")
    }
    //This Should run an incorrect test
    if(verifySecurityQuestion(email,secQuestion2)){
        println("Security Question 2's answer was the correct")
    } else{
        println("Security Question 2's answer was incorrect")
    }
    println("=============================End Security Question Answer Test=============================")

}
