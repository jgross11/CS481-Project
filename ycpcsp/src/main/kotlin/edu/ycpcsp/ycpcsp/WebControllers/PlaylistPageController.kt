package edu.ycpcsp.ycpcsp.WebControllers

import edu.ycpcsp.ycpcsp.DataBase.*
import edu.ycpcsp.ycpcsp.Models.PlayList
import edu.ycpcsp.ycpcsp.Models.SearchObject
import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.AddExperimentToPlaylistFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.AddNewPlaylistFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SearchFormData
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseBody


@Controller
class PlaylistPageController {

    @GetMapping("/PlaylistPage")
    fun sendChemicalAndFormulaVerificationPage(): String{
        println("Sending user to Playlist managment page...")
        return "PlaylistPage.html"
    }

    //TODO set up the loading of playlist right here.
    @PostMapping(path = ["/Playlist-Loader"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun loadUserPlaylist(@RequestBody user : Int) : Array<PlayList> {
        println("made it to PlaylistPageController line 25")
        //TODO make it so that the data reaches to data base
        return PlaylistSearch(user).toTypedArray();
    }

    //TODO Remove playlist
    @PostMapping(path = ["/Playlist-Remover"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun RemovePlaylist(@RequestBody playlistID : Int) : Boolean {
        println("made it to line 37")
        println(playlistID)
        var RemoveBoolean = RemovePlaylistDatabase(playlistID)
        println(RemoveBoolean)
        return true
    }


    //TODO Add Playlist
    @PostMapping(path = ["/Playlist-Adder"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun AddPlaylist(@RequestBody NewPlaylist : AddNewPlaylistFormData) : Boolean {
        println("made it to line 50 of PlaylistPageController")
        println(NewPlaylist)
        InsertPlaylisy(NewPlaylist.creator_ID, NewPlaylist.Playlist_Name)
        return true;
    }
    //TODO Add experiment to playlist
    @PostMapping(path = ["/Experiment-Adder"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun AddExperiment(@RequestBody ExperimentToAdd : AddExperimentToPlaylistFormData) : Boolean {
        InsertExperimentToPlaylist(ExperimentToAdd.experiment_ID, ExperimentToAdd.playlist_ID)
        println("made it to line 63")
        return true;
    }
    //TODO Remove experiment from playlist
    @PostMapping(path = ["/Experiment-Remover"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun RemoveExperiment(@RequestBody user : User) : Boolean {

        return true;
    }


    @PostMapping(path = ["/search-submit-playlist"], consumes = ["application/json"], produces = ["application/json"])
    @ResponseBody
    fun search(@RequestBody searchFormData: SearchFormData) : Array<SearchObject>{
        println("Received the search input")
        println(searchFormData)
        val experiment: Array<SearchObject> = SearchExperiment(searchFormData)
        println(experiment)
        return experiment
    }
}