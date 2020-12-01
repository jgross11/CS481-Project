package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.getAllEquationInformation
import edu.ycpcsp.ycpcsp.DataBase.getCompoundInformationByName
import edu.ycpcsp.ycpcsp.DataBase.insertCompound
import edu.ycpcsp.ycpcsp.DataBase.insertEquation
import edu.ycpcsp.ycpcsp.Models.ChemicalEquation
import edu.ycpcsp.ycpcsp.Models.ChemicalEquationResult
import edu.ycpcsp.ycpcsp.Models.ChemicalProperties
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.EquationFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.LoginFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody

@Controller
/**
 *  This class handles all GET and POST interactions that regard the equation insertion page.
 */
class EquationInsertionController {

    // sends equation insertion html file to user
    @GetMapping("/insertEquation")
    fun sendHomePage(): String{
        println("Sending user to equation insertion page...")
        return "EquationInsertion.html"
    }

    // returns all equation information in DB, raw
    @PostMapping(path = ["/load-all-equations"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun loadAllEquationInformation() : Array<ChemicalEquationResult?>?{
        println("Sending all equation information")
        return getAllEquationInformation()
    }

    // given information about an equation, attempt to insert the information into the DB
    // return true if information is added, false otherwise.
    @PostMapping(path = ["/submit-equation-information"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun submitNewChemical(@RequestBody equation : EquationFormData) : Boolean {
        println("received following chemical information")
        println(equation.toString())
        return if(insertEquation(equation)){
            println("equation successfully inserted")
            true
        } else{
            false
        }
    }
}