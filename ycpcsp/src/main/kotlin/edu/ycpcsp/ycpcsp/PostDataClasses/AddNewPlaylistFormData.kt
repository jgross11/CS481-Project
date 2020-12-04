package edu.ycpcsp.ycpcsp.PostDataClasses

class AddNewPlaylistFormData(var creator_ID : Int, var title: String){
    override fun toString(): String {
        return "$creator_ID, $title"
    }
}
