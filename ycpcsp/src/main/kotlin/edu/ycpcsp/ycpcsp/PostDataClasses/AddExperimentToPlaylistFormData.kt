package edu.ycpcsp.ycpcsp.PostDataClasses

class AddExperimentToPlaylistFormData(var experiment_ID: Int, var playlist_ID: Int){
    override fun toString(): String {
        return "$experiment_ID, $playlist_ID"
    }
}