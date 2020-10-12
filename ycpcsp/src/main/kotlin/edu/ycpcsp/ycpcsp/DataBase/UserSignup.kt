package edu.ycpcsp.ycpcsp.DataBase

import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun UserSignup(id : Int, firstName: String, lastName: String, email: String, password: String, organization: String, question1: String, question2: String, question3: String, ans1: String, ans2: String, ans3: String): Boolean {
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
        val rs = st.executeUpdate("INSERT INTO Database.Users (id, firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3)" +
        " VALUES('"+id+"','"+firstName+"', '"+lastName+"','"+email+"','"+password+"','"+organization+"','"+question1+"','"+question2+"','"+question3+"', '"+ans1+"', '"+ans2+"', '"+ans3+"')")

        return true

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }

    return false
}