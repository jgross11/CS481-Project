package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun FindMyExperiments(userID: Int): Array<Experiment> {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val TITLE = 0
    val CREATORID = 1

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    //This creates an empty array of Experiment
    val experiments = arrayOf<Experiment>()

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT * FROM Database.Experiments where creatorID = \"$userID\";")
        //seems to return something, but i can't access it for some god forsaken reason

        rs.first()
        println("Should return something "+rs.getString(TITLE))
        //println("This should return something "+rs.getString(TITLE))

        rs.next()
//        while(rs.next()){
//          experiments.plus(Experiment(rs.getString(TITLE), rs.getString(CREATORID)))
//            //experiment field needs something like creatorID, i'll put creatorID in creator name for now
//        }



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