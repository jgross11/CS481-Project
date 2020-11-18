package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.SecurityQuestion
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.UserAndExperiment
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class DatabaseTests {
    private val testUser = User("Test", "Test", "test@test.com", "1234", "TheBest", 1)
    private val falseUser = User("Test", "Test", "test@test.com", "666", "TheBest", 1)
    private val userLogIn = LoginFormData(testUser.email, testUser.password)
    private val falseUserLogIn = LoginFormData(falseUser.email, falseUser.password)
    private val originalUser = LoadUser(testUser.email)
    private val modifyUser = EditUserFormData("Firstname", "Lastname", "test@test.com", "4321", "The Worst")

    @Test
    fun testVerifyUsers() {
        assertTrue(VerifyUser(userLogIn))
        println("User was able to be verified")
        assertFalse(VerifyUser(falseUserLogIn))
        println("Verify User correctly found the wrong password incorrect")
    }
    @Test
    fun testLoadUser(){
        val testFirstName = "Test"
        assertTrue(LoadUser(testUser.email).firstName.compareTo(testFirstName) == 0)
        //print case for test output
        println("Load User was able find a match between the test user's first name\nSo load user should have grabbed the correct User attributes")
    }
    @Test
    fun testModifyUser(){
        //testing to make sure modify user runs
        assertTrue(ModifyUser(modifyUser))
        println("Modify User correctly ran")

        val checkerUser = LoadUser(modifyUser.email)
        assertTrue(checkerUser.firstName.compareTo(originalUser.firstName) != 0)
        println("The modified user's firstname does indeed not match the original users firstname")
        assertTrue(checkerUser.firstName.compareTo(modifyUser.firstName) != 0)
        println("The modified user's firstname does match the modified user's firstname")

        //assertTrue(ModifyUser(originalUser)) // TODO fix this
    }
    @Test
    fun testSecurityQuestion(){
        val secQuestion1 = SecurityQuestion(1,"test")
        val secQuestion2 = SecurityQuestion(1, "wrong")

        //Checking that verifySecurityQuestion method ran
        assertTrue(verifySecurityQuestion(testUser.email, secQuestion1))
        if(verifySecurityQuestion(testUser.email,secQuestion1)){
            println("Security Question 1's answer was the correct")
        } else{
            println("Security Question 1's answer was incorrect")
        }

        //running an incorrect test
        assertFalse(verifySecurityQuestion(testUser.email, secQuestion2))
        if(verifySecurityQuestion(testUser.email,secQuestion2)){
            println("Security Question 2's answer was the correct but it should be wrong")
        } else{
            println("Security Question 2's answer was incorrect which is what the result should be")
        }
    }
    //TODO Complete create experiment test and delete experiment test
    @Test
    fun testCreateAndDeleteExperiment(){
//        println("=============================Begin Create Experiment Test=============================")
//        var newExperiment = Experiment("Cool Experiment", "Yeah", 8)
//        var userAndExp = UserAndExperiment(originalUser, newExperiment)
//        val testChecker = CreateExperiment(userAndExp)
//        if(testChecker){
//            println("Create Experiment successfully ran")
//        }else{
//            println("Create Experiment did not run successfully")
//        }
//
//        println("=============================End Create Experiment Test=============================")
//
//        println("=============================Begin Delete Experiment Test=============================")
//        //Test case will no longer work since experimentID 8 is deleted
//        val experimentID = 8
//
//        if(!DeleteExperiment(experimentID)){
//            println("Error: Was unable to complete delete experiment")
//
//        } else{
//            println("Delete experiment was a success")
//        }
//
//        println("=============================End Delete Experiment Test=============================")
    }


    @Test
    fun testCreateQuarantineUser(){
        val quaraUser = SignupFormData("aaa", "aaa", "aaa", "aaa", "aaa", 1, "answ", 2, "answw", 3, "answww")

        assertTrue(CreateQuarantineUser(quaraUser) != -1)
        if(CreateQuarantineUser(quaraUser) != -1){
            println("Create Quartine User worked")
        } else{
            println("Error: Create Quarantine User did not work")
        }

    }
    @Test
    fun testLoadQuarantineUser(){
        val quaraUser2 = LoadQuarantineUser("aaa")
        assertTrue(quaraUser2.firstName.compareTo("Aaa") == 0)
        if(quaraUser2.firstName.compareTo("Aaa") == 0){println("Load Quarantine User Worked")} else{
            println("Load Quarantine User did not work")
        }
    }
    @Test
    fun testDeleteQuarantineUser(){
        val quaraUser2 = LoadQuarantineUser("aaa")
        val testDelete = DeleteQuarantineUser(quaraUser2)
        assertTrue(testDelete)

        if(testDelete){
            println("Delete Quarantine User works")
        } else{
            println("Delete Quarantine User does not work")
        }
    }
    @Test
    fun testCreateAdminUser(){
        val adminUser = SignupFormData("aaa", "aaa", "aaa", "aaa", "aaa", 1, "answ", 2, "answw", 3, "answww")

        assertTrue(CreateAdminUser(adminUser) != -1)
        if(CreateAdminUser(adminUser) != -1){
            println("Create Admin User worked")
        } else{
            println("Error: Create Admin User did not work")
        }

    }
    @Test
    fun testLoadAdminUser(){
        val adminUser2 = LoadAdminUser("aaa")
        assertTrue(adminUser2.firstName.compareTo("Aaa") == 0)
        if(adminUser2.firstName.compareTo("Aaa") == 0){println("Load Admin User Worked")} else{
            println("Load Admin User did not work")
        }
    }
    @Test
    fun testDeleteAdminUser(){
        val adminUser2 = LoadAdminUser("aaa")
        val testDelete = DeleteAdminUser(adminUser2)
        assertTrue(testDelete)

        if(testDelete){
            println("Delete Admin User works")
        } else{
            println("Delete Admin User does not work")
        }
    }
    
    @Test
    fun testFindMyExperiments(){
        val userID = LoadUser("jgross11@ycp.edu")
        val testExperiment = Experiment("Color", "Josh Gross", 1)
        var testChecker = false

        val experiments = FindMyExperiments(userID)
        //kotlin has this cool experiment iterator
        //the native iterator for each natively sets the variable to "it"
        experiments.iterator().forEach {
            assertTrue(it.title.compareTo(testExperiment.title) == 0)
            if (it.title.compareTo(testExperiment.title) == 0) {
                print("The title is " + it.title+"---------")
                assertTrue(it.creatorName.compareTo(testExperiment.creatorName) == 0)
                if (it.creatorName.compareTo(testExperiment.creatorName) == 0) {
                    print("Find My Experiments works so far")
                } else{
                    print("Error: Everything in Find My Experiments was not the same")
                }
                println("-----The creator Name is " + it.creatorName)
            } else {
                println("Error: Find My Experiments did not work")
            }

        }
    }

}