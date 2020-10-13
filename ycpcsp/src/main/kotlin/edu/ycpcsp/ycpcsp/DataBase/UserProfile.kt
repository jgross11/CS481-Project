package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


/**This function is going to be used to get the information of a person through their id. The database will pull the information and store it in an array so the front end can use it to display
 * the user info on the screen when others or themselves wish to view their profile info.**/


fun UserProfile (id: String?){
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"

    try{
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        val rs = st.executeQuery("Select * from Database.Users")

        val array = arrayOfNulls<String?>(13)// make empty array to store the values of the database in but make it 13

        rs.next()   // required to get to the rs
        for (x in 1..12) {  //go to twelve so you're grabbing 12 items from the return statement from the database.
            //each value in the array corresponds to the order they are in, in the database
            array[x] = rs.getString(x)
        }



    }catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
}