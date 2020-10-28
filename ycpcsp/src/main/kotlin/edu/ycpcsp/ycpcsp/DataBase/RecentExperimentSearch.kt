package edu.ycpcsp.ycpcsp.DataBase


import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*
import edu.ycpcsp.ycpcsp.PostDataClasses.RecentExperimentObject


var Experiment1 = 1;
var Experiment1Date = 1;
var Experiment2 = 1;
var Experiment2Date = 1;
var Experiment3 = 1;
var Experiment1Dat3 = 1;

fun LoadUser(UserObject: User): RecentExperimentObject{
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try {
        //test class fails here
        Class.forName("com.mysql.jdbc.Driver")

        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("SELECT * FROM Database.RecentExperiments where idRecentExperiments = \"$UserObject.id\";")

        try{
            rs.next()
            return RecentExperimentObject(rs.getString(Experiment1),rs.getString(Experiment1Date),rs.getString(Experiment2),rs.getString(Experiment2Date),rs.getString(Experiment3), rs.getString(Experiment1Dat3))
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }
        return RecentExperimentObject()

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return RecentExperimentObject()
}


