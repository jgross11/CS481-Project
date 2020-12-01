package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.Models.User
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody

class AdminFormulaAndChemicalVerificationPage {

    @GetMapping("/ChemicalAndFormulaVerification")
    fun sendChemicalAndFormulaVerificationPage(): String{
        println("Sending user to Chemical and Formula verification page...")
        return "ChemicalAndForumlaVerification.html"
    }

    //TODO set up the verification process right here.
    @PostMapping(path = ["/admin-verification"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun submitNewChemical(@RequestBody user : User) : Boolean {

        return true;
    }
}