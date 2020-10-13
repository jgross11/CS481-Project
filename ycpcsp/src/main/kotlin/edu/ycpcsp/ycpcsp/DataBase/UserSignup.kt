package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.util.*


fun UserSignup(signupFormData: SignupFormData): Boolean {
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
        val rs = st.executeUpdate("INSERT INTO Database.Users (firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3)" +
        " VALUES('"+signupFormData.firstName+"', '"+signupFormData.lastName+"','"+signupFormData.email+"','"+signupFormData.password+"','"+signupFormData.school+"','"+signupFormData.sq1+"','"+signupFormData.sq2+"','"+signupFormData.sq3+"', '"+signupFormData.sq1a+"', '"+signupFormData.sq2a+"', '"+signupFormData.sq3a+"')")
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