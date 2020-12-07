package edu.ycpcsp.ycpcsp.PostDataClasses

import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.User
import java.util.*

data class RecentExperimentObject(var Experiment1: String, var Experiment1Date: String, var Experiment2: String, var Experiment2Date: String, var Experiment3: String,var Experiment3Date: String) {

    // A null contructor sets all fields to blank strings.
    constructor() : this("", "", "","","","" ) {

    }

}

