package edu.ycpcsp.ycpcsp.WebControllers


import edu.ycpcsp.ycpcsp.DataBase.CreateExperiment
import edu.ycpcsp.ycpcsp.DataBase.LoadExperiment
import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.PostDataClasses.UserAndExperiment
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


@Controller
class CreationController {
    // Sends user to the creation page
    @GetMapping("/Creation")
    fun simulation() : String{
        println("Sending user to \"Creation\" page")
        return "Creation.html"
    }


    @PostMapping(path = ["/Creation-data"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun getSimulationData(@RequestBody id : Integer) : Experiment{
        var exp = Experiment()
        println(id)
        exp = LoadExperiment("$id");
        return exp
    }

}