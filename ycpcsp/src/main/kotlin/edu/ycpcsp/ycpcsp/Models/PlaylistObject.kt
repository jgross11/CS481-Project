package edu.ycpcsp.ycpcsp.Models

data class PlaylistObject(
        var Experiment_ID: Int,
        var Creator_ID:Int,
        var Title: String,
        var Firstname: String,
        var Lastname:String
)
{

    //Null constructor
    constructor() : this(-1, -1, "", "", "")

    override fun toString(): String {
        return "$Experiment_ID, $Creator_ID, $Title, $Firstname, $Lastname"
    }
}