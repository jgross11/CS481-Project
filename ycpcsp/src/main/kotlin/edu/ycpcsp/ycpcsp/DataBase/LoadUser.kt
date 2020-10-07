package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*
import edu.ycpcsp.ycpcsp.Models.*

//enum class UserFields {FirstName, LastName, Email, Password, School}
var FirstName = 0
var LastName = 1
var Email = 2
var Password = 3
var School = 4

fun loadUser(email: String): User? {
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
        val rs = st.executeQuery("SELECT firstName, lastName, organization FROM Database.Users where email = \"$email\";")

        rs.next()

        return User(rs.getString(FirstName),rs.getString(LastName),rs.getString(Email),rs.getString(Password),rs.getString(School))
    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return null
}
