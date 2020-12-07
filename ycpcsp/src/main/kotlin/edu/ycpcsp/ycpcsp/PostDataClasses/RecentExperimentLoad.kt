package edu.ycpcsp.ycpcsp.PostDataClasses

import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.User
import kotlin.math.exp

data class RecentExperimentLoad (var userid : Int, var experimentName: String){
    override fun toString(): String {
        return "${userid.toString()}, ${experimentName.toString()}"
    }
}
