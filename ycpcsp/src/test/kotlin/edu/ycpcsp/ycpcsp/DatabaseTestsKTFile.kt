
package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.Models.*
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.UserAndExperiment

var email = "test@test.com"
var userPassword = "1234"

fun main(){
    //TODO this section of code tests VerifyUser.kt
//    var userLogIn = LoginFormData(email, userPassword)
//
//    println("=============================Begin VerifyUser Test=============================")
//    if(VerifyUser(userLogIn)){
//        println("Test VerifyUser is working")
//    } else{
//        println("Error VerifyUser does not work")
//    }
//    println("=============================End VerifyUser Test=============================")
//
//    //TODO this section of code tests LoadUser
//    println("=============================Begin LoadUser Test=============================")
//
//    var testUser = LoadUser(email)
//    var testCompare : Array<String> = arrayOf("Test", "Name", "test@test.com","test-inc")
//    if(testUser != null) {
//        assert(testUser.firstName.compareTo(testCompare[0]) == 0)
//        assert(testUser.lastName.compareTo(testCompare[1]) == 0)
//        assert(testUser.email.compareTo(testCompare[2]) == 0)
//        assert(testUser.school.compareTo(testCompare[3]) == 0)
//        println("LoadUser works just fine")
//
//    }
//    println()
//    println("=============================End LoadUser Test=============================")
//
//    //TODO ModifyUser test
//    println("=============================Begin Modify User Test=============================")
//
//    var originalUser = LoadUser(email)
//    var modifyUser = User("Firstname", "Lastname", "test@test.com", "1234", "TheBest")
//    if(ModifyUser(modifyUser)){
//        if(originalUser != null){
//            //if you wish to verify whether or not the ModifyUser is actually working comment out the line below
//            ModifyUser(originalUser)
//        }
//        println("Modify User successfully ran")
//    } else{
//        println("Modify User did not successfully run")
//        println("Double check the database table to make sure the data is not corrupted")
//    }
//    println("=============================End Modify User Test=============================")
//    //Todo Security Question Answer Verification Test
//
//    println("=============================Begin Security Question Answer Test=============================")
//    val secQuestion1 = SecurityQuestion(1,"test")
//    val secQuestion2 = SecurityQuestion(1, "wrong")
//
//    //This should run a correct test
//    if(verifySecurityQuestion(email,secQuestion1)){
//        println("Security Question 1's answer was the correct")
//    } else{
//        println("Security Question 1's answer was incorrect")
//    }
//    //This Should run an incorrect test
//    if(verifySecurityQuestion(email,secQuestion2)){
//        println("Security Question 2's answer was the correct")
//    } else{
//        println("Security Question 2's answer was incorrect")
//    }
//    println("=============================End Security Question Answer Test=============================")

//    println("=============================Begin Create Experiment Test=============================")
//    var newExperiment = Experiment("Cool Experiment", "Yeah")
//    originalUser= LoadUser(email)
//    var userAndExp = UserAndExperiment(originalUser, newExperiment)
//   CreateExperiment(userAndExp)
//    //TODO Delete Experiment & Delete all of the steps too
//
//    println("=============================End Create Experiment Test=============================")

//    println("=============================Begin Delete Experiment Test=============================")
//    //Test case will no longer work since experimentID 8 is deleted
//    val experimentID = "8"
//
//    if(!DeleteExperiment(experimentID)){
//        println("Error: Was unable to complete delete experiment")
//
//    } else{
//        println("Delete experiment was a success")
//    }
//    //TODO Delete Experiment & Delete all of the steps too
//
//    println("=============================End Delete Experiment Test=============================")

//    println("=============================Begin Create Quarantine User=============================")
//    val quaraUser = SignupFormData("aaa", "aaa", "aaa", "aaa", "aaa", 1, "answ", 2, "answw", 3, "answww")
//
//    if(CreateQuarantineUser(quaraUser)){
//                println("Create Quartine User worked")
//            } else{
//        println("Error: Create Quarantine User did not work")
//    }
//    val quaraUser2 = LoadQuarantineUser("aaa")
//    if(quaraUser2.firstName.compareTo("UNKNOWN") == 0){println("Load Quarantine User Worked")} else{
//        println("Load Quarantine User did not work")
//    }
//
//    if(DeleteQuarantineUser(quaraUser2)){
//        println("Delete Quarantine User works")
//    } else{
//        println("Delete Quaratine User does not work")
//    }
//
//    println("=============================End Create Quarantine User=============================")

    println("=============================Begin Find My Experiments=============================")
    val userID = 7
    val testExperiment = Experiment("Color", "7", 1)

    val experiments = FindMyExperiments(userID)
    for(x in 0 until experiments.size) {
        if (experiments[x].title.compareTo(testExperiment.title) == 0) {
            println("The title is " + experiments[x].title)
            if (experiments[x].creatorName.compareTo(testExperiment.creatorName) == 0) {
                println("Find My Experiments works so far")
            }
            println("The creator Name is " + experiments[x].creatorName)
        } else {
            println("Error: Find My Experiments did not work")
        }
    }

    println("=============================End Find My Experiments=============================")
}
