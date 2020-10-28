package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun FindMyExperiments(user: User): MutableList<Experiment> {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val CREATORID = 1
    val TITLE = 2

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    //This creates an empty array of Experiment
    val experiments = mutableListOf<Experiment>()

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT * FROM Database.Experiments where creatorID = \"${user.id}\";")


        while(rs.next()){
            //println("The title is ${rs.getString(TITLE)} and the user id is ${rs.getInt(CREATORID)}")
            experiments.add(Experiment(rs.getString(TITLE), "${user.firstName}  ${user.lastName}",rs.getInt(CREATORID)))
            //experiment field needs something like creatorID, i'll put creatorID in creator name for now
        }



        return experiments

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return experiments
}