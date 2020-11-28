package edu.ycpcsp.ycpcsp.WebControllers


import edu.ycpcsp.ycpcsp.DataBase.CreateExperiment
import edu.ycpcsp.ycpcsp.DataBase.LoadExperiment
import edu.ycpcsp.ycpcsp.DataBase.insertCompound
import edu.ycpcsp.ycpcsp.Models.ChemicalProperties
import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.PostDataClasses.CreationNewChemicalFormData
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

    // given an Experiment object representing a newly created experiment,
    // attempt to save Experiment object in DB. return true if save successful, false otherwise
    @PostMapping(path = ["/save-new-creation"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun submitNewSimulation(@RequestBody userAndExp : UserAndExperiment) : Boolean{
        var result = true
        println("User ${userAndExp.user?.getFullName()} wants to submit following experiment data to DB:")
        println(userAndExp.experiment)
        // FOR TESTING PURPOSES ONLY
        var copyAlreadyInDB = LoadExperiment("21")
        println("\nCOMPARED TO\n")
        println(copyAlreadyInDB)
        println("result: ${copyAlreadyInDB.equals(userAndExp.experiment)}")
        // NOTE: THEY MATCH! GOOD FOR NOW
        // END TESTING PURPOSES
        result = CreateExperiment(userAndExp)
        return result
    }

    // given an Experiment object representing a modified experiment (edit(s) made to one already in DB)
    // overwrite old information in DB with new information. return true if overwrite successful, false otherwise
    @PostMapping(path = ["/update-existing-creation"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun updateExistingSimulation(@RequestBody exp : Experiment) : Boolean{
        var result = true
        // TODO ATTEMPT TO OVERWRITE EXISTING DB INFO
        // result = updateExperiment(exp)
        return result
    }
    // this post mapping will take the chemical information of a newly created chemical from the creation page and insert into the database
    // the returning of this post mapping should be a list of chemicals that will be added to Austins list
    @PostMapping(path = ["/Creation-Of-New-Chemical"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun createNewChemical(@RequestBody chemical : CreationNewChemicalFormData) : Boolean{
        println("yay the think is making it here you heard");
        var newChemical = ChemicalProperties();
        newChemical.meltingPoint = chemical.ChemicalPhaseChangeSolid;
        newChemical.name =  chemical.ChemicalName;
        newChemical.molarMass = chemical.ChemicalMass;
        newChemical.isWaterSoluble = chemical.ChemicalWaterSoluable;
        newChemical.boilingPoint = chemical.ChemicalPhaseChangeLiquid;
        newChemical.formula = chemical.ChemicalFormula;
        newChemical.density =  chemical.ChemicalDensity;
        newChemical.colors.gasColor =chemical.ChemicalGasColor;
        newChemical.colors.liquidColor = chemical.ChemicalLiquidColor;
        newChemical.colors.solidColor =chemical.ChemicalSolidColor;

        println(newChemical);
        return insertCompound(newChemical);

    }
}