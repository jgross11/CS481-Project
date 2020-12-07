package edu.ycpcsp.ycpcsp.Models
// The playlist class is used for frontend to backend usage of the playlist object.
data class PlayList (
        var creatorID: Int,
        var title: String,
        var playlistID: Int
){
    var entries = Array<PlaylistObject>(0){ PlaylistObject() }

    // null constructor
    constructor() : this(-1, "", -1){}

    override fun toString(): String {
        var result = "$creatorID $playlistID $title"
        for (entry in entries){
            result += entry.toString()
        }
        return result
    }


}