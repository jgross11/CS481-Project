package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.EditUserFormData
import edu.ycpcsp.ycpcsp.Models.User
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*

fun ModifyUser(editUserFormData: EditUserFormData): Boolean {
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

        try{
            val rs = st.executeUpdate("update Database.Users " +
                    "SET firstName = \'${editUserFormData.firstName}\', lastName =\'${editUserFormData.lastName}\', password = \'${editUserFormData.password}\', organization = \'${editUserFormData.school}\'" +
                    "WHERE email = \'${editUserFormData.email}\';")
            //The method will return true if the query was able to successful update the desired User row
            return true
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }
        //The method will return false if the query was unsuccessful

        return false
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    //return false if the query was not successful
    return false
}