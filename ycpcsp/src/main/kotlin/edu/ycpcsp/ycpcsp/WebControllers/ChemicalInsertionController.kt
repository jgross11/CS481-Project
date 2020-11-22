package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.getCompoundInformationByName
import edu.ycpcsp.ycpcsp.DataBase.insertCompound
import edu.ycpcsp.ycpcsp.Models.ChemicalProperties
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody

@Controller
/**
 *  This class handles all GET and POST interactions that regard the chemical insertion page.
 */
class ChemicalInsertionController {

    // sends chemical insertion html file to user
    @GetMapping("/insertChemical")
    fun sendHomePage(): String{
        println("Sending user to chemical insertion page...")
        return "ChemicalInsertion.html"
    }

    // given information about a chemical, attempt to insert the information into the DB
    // return true if information is added, false otherwise.
    @PostMapping(path = ["/submit-chemical-information"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun submitNewChemical(@RequestBody chemical : ChemicalProperties) : Boolean {
        println("received following chemical information")
        println(chemical.toString())
        return if(getCompoundInformationByName(chemical.name) != null){
            println("Chemical already in DB")
            false
        } else{
            if(insertCompound(chemical)){
                println("Chemical inserted into DB")
                true
            } else{
                println("Could not insert chemical into DB")
                false
            }
        }
    }
}