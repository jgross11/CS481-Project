package edu.ycpcsp.ycpcsp.Models

import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*

internal class SecurityQuestionTest {
    var FakeQuestion = SecurityQuestion(1,"Jim is my pet dog")
    @Test
    fun getQuestion() {
        assertEquals(1, FakeQuestion.questionIndex)
    }

    @Test
    fun getAns() {
        assertEquals("Jim is my pet dog", FakeQuestion.answer)
    }
}