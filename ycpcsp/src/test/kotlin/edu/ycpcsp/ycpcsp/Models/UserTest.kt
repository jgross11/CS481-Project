package edu.ycpcsp.ycpcsp.Models

import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormDataTest
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import java.security.Security

internal class UserTest {
    var testNullUser = User()
    var testActualUser = User("josh", "gross", "jgross11@ycp.edu", "123QWEasd", "YCP", 1)


    @BeforeEach
    fun setup(){
        testActualUser.securityQuestions[0] = SecurityQuestion(1, "Yes")
        testActualUser.securityQuestions[1] = SecurityQuestion(2, "No")
        testActualUser.securityQuestions[2] = SecurityQuestion()

    }

    @Test
    fun testNullUserProperties(){
        assertEquals(testNullUser.firstName, "")
        assertEquals(testNullUser.lastName, "")
        assertEquals(testNullUser.email, "")
        assertEquals(testNullUser.password, "")
        assertEquals(testNullUser.school, "")
        assertEquals(testNullUser.id, -1)
        assertEquals(testNullUser.securityQuestions.size, 3)
    }

    @Test
    fun testActualUserProperties(){
        assertEquals(testActualUser.firstName, "Josh")
        assertEquals(testActualUser.lastName, "Gross")
        assertEquals(testActualUser.email, "jgross11@ycp.edu")
        assertEquals(testActualUser.password, "123QWEasd")
        assertEquals(testActualUser.school, "YCP")
        assertEquals(testActualUser.id, 1)
        assertEquals(testActualUser.securityQuestions.size, 3)
        assertEquals(testActualUser.securityQuestions[0].questionIndex, 1)
        assertEquals(testActualUser.securityQuestions[0].question, SecurityQuestionEnum.values()[1].question)
        assertEquals(testActualUser.securityQuestions[0].answer, "Yes")
        assertEquals(testActualUser.securityQuestions[1].questionIndex, 2)
        assertEquals(testActualUser.securityQuestions[1].question, SecurityQuestionEnum.values()[2].question)
        assertEquals(testActualUser.securityQuestions[1].answer, "No")
        assertEquals(testActualUser.securityQuestions[2].questionIndex, -1)
        assertEquals(testActualUser.securityQuestions[2].question, "")
        assertEquals(testActualUser.securityQuestions[2].answer, "")
    }

    @Test
    fun testTransferFromFormData(){
        var signupFormData = SignupFormData("Dennis", "Chism", "dchism@ycp.edu", "234WERsdf", "NYCP", 2, "No", 1, "Yes", 3, "Maybe")
        testActualUser.setContentsFromForm(signupFormData)
        assertEquals(testActualUser.firstName, "Dennis")
        assertEquals(testActualUser.lastName, "Chism")
        assertEquals(testActualUser.email, "dchism@ycp.edu")
        assertEquals(testActualUser.password, "234WERsdf")
        assertEquals(testActualUser.school, "NYCP")
        assertEquals(testActualUser.securityQuestions.size, 3)
        assertEquals(testActualUser.securityQuestions[0].questionIndex, 2)
        assertEquals(testActualUser.securityQuestions[0].question, SecurityQuestionEnum.values()[2].question)
        assertEquals(testActualUser.securityQuestions[0].answer, "No")
        assertEquals(testActualUser.securityQuestions[1].questionIndex, 1)
        assertEquals(testActualUser.securityQuestions[1].question, SecurityQuestionEnum.values()[1].question)
        assertEquals(testActualUser.securityQuestions[1].answer, "Yes")
        assertEquals(testActualUser.securityQuestions[2].questionIndex, 3)
        assertEquals(testActualUser.securityQuestions[2].question, SecurityQuestionEnum.values()[3].question)
        assertEquals(testActualUser.securityQuestions[2].answer, "Maybe")
    }
}