package edu.ycpcsp.ycpcsp.WebControllers

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*


/**
 *  This class handles all GET and POST interactions that regard the simulation page.
 */
@Controller
class SimulationController {

    // Sends user to the Simulation page
    @GetMapping("/simulation")
    fun simulation() : String{
        println("Sending user to \"simulation\" page")
        return "simulator.html"
    }
}