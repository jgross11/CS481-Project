package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.SearchExperiment
import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

/**
 *  This class handles all GET and POST interactions that regard the search page.
 */

@Controller
class SearchController {
    //send search html file to user
    @GetMapping("/SearchPage")
    fun sendSearchPage(): String {
        println("Sending user to search page...")
        return "SearchPage.html"
    }

    @PostMapping(path = ["/search-submit"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun search(@RequestBody searchFormData: SearchFormData) : MutableList<String>{
        println("Received the search input")
        println(searchFormData)
        var experimentName: MutableList<String> = arrayListOf()

        experimentName = SearchExperiment(searchFormData)

        return experimentName
    }
}