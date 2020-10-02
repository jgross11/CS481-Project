package edu.ycpcsp.ycpcsp.Models

/**
 *  Class that contains DB information pertaining to a user of the website
 *  stores information such as name, email, school, etc.
 *  will eventually be passed as to front end for rendering purposes.
 */

// primary constructor
data class User(var firstName : String = "UNKNOWN",
                var lastName : String = "UNKNOWN",
                var email : String = "UNKNOWN",
                var password : String = "UNKNOWN",
                var school : String = "UNKNOWN"
                )
{
    // init questions, experiment, recent experiment arrays as empty
    var securityQuestions : Array<SecurityQuestion> = arrayOf<SecurityQuestion>()
    var experiments : Array<Experiment> = arrayOf<Experiment>()
    var recentExperiments : Array<Experiment> = arrayOf<Experiment>()

    // capitalize name
    init
    {
        firstName = firstName.capitalize()
        lastName = lastName.capitalize()
        securityQuestions = Array(3){SecurityQuestion()}

    }

    /**
     *  Custom toString function in form of
     *  lastName, firstName
     *  email password
     *  school
     *  security question information
     *  experiment information
     *  recent experiment information
     */
    override fun toString() : String{

        if (this == null) return "null"
        var result = ""
        result += "$lastName, $firstName \n$email  $password \n$school\n"
        for(securityQuestion in securityQuestions){
            result += "${securityQuestion.toString()}\n"
        }
        for(experiment in experiments){
            result += "${experiment.toString()}\n"
        }
        for(recentExperiment in recentExperiments){
            result += "${recentExperiment.toString()}\n"
        }
        return result
    }

    fun getFullname() : String{
        return "$firstName $lastName"
    }

}