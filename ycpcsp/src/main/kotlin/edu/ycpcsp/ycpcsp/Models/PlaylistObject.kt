package edu.ycpcsp.ycpcsp.Models

data class PlaylistObject(
        var experimentID: Int,
        var creatorID:Int,
        var title: String,
        var firstName: String,
        var lastName:String
)
{

    //Null constructor
    constructor() : this(-1, -1, "", "", "")

    override fun toString(): String {
        return "$experimentID, $creatorID, $title, $firstName, $lastName\n"
    }
}