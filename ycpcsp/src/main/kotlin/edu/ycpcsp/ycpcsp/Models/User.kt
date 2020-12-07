package edu.ycpcsp.ycpcsp.Models

import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData

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
                var school : String = "UNKNOWN",
                var id : Int = -1
                )
{
    // init questions, experiment, recent experiment, playlist  arrays as empty
    var securityQuestions : Array<SecurityQuestion> = arrayOf<SecurityQuestion>()
    var experiments : Array<Experiment> = arrayOf<Experiment>()
    var recentExperiments : Array<Experiment> = arrayOf<Experiment>()
    var playlists : Array<PlayList> = arrayOf<PlayList>()

    // assume a user is not quarantined, changed to true if user is quarantined when fetching from DB
    var isQuarantined = false
    // capitalize name
    init
    {
        firstName = firstName.capitalize()
        lastName = lastName.capitalize()
        securityQuestions = Array(3){SecurityQuestion()}

    }

    // 'null' constructor TODO make this redundant please...
    constructor() : this("", "", "","","", -1) {}


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

        var result = ""
        result += "ID $id : $lastName, $firstName \n$email  $password \n$school\n"
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

    fun getFullName() : String{
        return "$firstName $lastName"
    }

    fun setContentsFromForm(signupFormData: SignupFormData) {
        firstName = signupFormData.firstName
        lastName = signupFormData.lastName
        email = signupFormData.email
        password = signupFormData.password
        school = signupFormData.school
        securityQuestions[0] = SecurityQuestion(signupFormData.sq1, signupFormData.sq1a)
        securityQuestions[1] = SecurityQuestion(signupFormData.sq2, signupFormData.sq2a)
        securityQuestions[2] = SecurityQuestion(signupFormData.sq3, signupFormData.sq3a)
    }

    fun setContentsFromEdit(editUserFormData: EditUserFormData) {
        firstName = editUserFormData.firstName
        lastName = editUserFormData.lastName
        email = editUserFormData.email
        password = editUserFormData.password
        school = editUserFormData.school

    }
}