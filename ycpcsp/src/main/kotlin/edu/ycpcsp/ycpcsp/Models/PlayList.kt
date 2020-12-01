package edu.ycpcsp.ycpcsp.Models
// The playlist class is used for frontend to backend usage of the playlist object.
data class PlayList (
        var Creator_ID: Int,
        var Playlist_Title: String,
        var Playlist_ID: Int
){
    var Experiment = ArrayList<PlaylistObject>(0)
    override fun toString(): String {
        return "$Creator_ID $Playlist_ID ${Playlist_Title}"
    }


}