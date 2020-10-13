package edu.ycpcsp.ycpcsp.PostDataClasses

import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.User

data class UserAndExperiment (var user : User, var experiment : Experiment){
    override fun toString(): String {
        return "${user.toString()}\n${experiment.toString()}"
    }
}