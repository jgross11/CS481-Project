package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.Experiment
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun LoadExperiment(id: String) : Experiment {
    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = edu.ycpcsp.ycpcsp.DataBase.password
    connectionProps["useSSL"] = "false"

    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("Select title, tags, firstName, lastName from Database.Experiments join Database.Users on Database.Experiments.creatorID = Database.Users.UserID where ExperimentsID = \"$id\" ")
        val array = arrayOfNulls<String?>(13)// make empty array to store the values of the database in but make it 13
        val rs2 = st.executeQuery("Select StepsID from Database.Steps where StepsID = \"$id\"")
        rs.next()
        for(x in 1..4){
           array[x] = rs.getString(x)
        }

        val title = array[1]
        val tags = array[2]
        val creatorName:String = array[3] + " " + array[4]
        rs2.last()
        val numSteps = rs2.row

        return Experiment(title!!, creatorName, tags!!, numSteps)

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return Experiment("null", "null", "null", 0)
}


