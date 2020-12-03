package edu.ycpcsp.ycpcsp.PostDataClasses

class AddNewPlaylistFormData(var creator_ID : Int, var Playlist_Name: String){
    override fun toString(): String {
        return "$creator_ID, $Playlist_Name"
    }
}
