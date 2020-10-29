package edu.ycpcsp.ycpcsp.DataBase

import edu.ycpcsp.ycpcsp.Models.User
import edu.ycpcsp.ycpcsp.PostDataClasses.SignupFormData
import java.sql.DriverManager
import java.sql.SQLException
import java.sql.Statement
import java.util.*


fun CreateQuarantineUser(signupFormData: SignupFormData): Int {
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"
    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.prepareStatement("INSERT INTO Database.Quarantine_Users (firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3) VALUES('"+signupFormData.firstName+"', '"+signupFormData.lastName+"','"+signupFormData.email+"','"+signupFormData.password+"','"+signupFormData.school+"','"+signupFormData.sq1+"','"+signupFormData.sq2+"','"+signupFormData.sq3+"', '"+signupFormData.sq1a+"', '"+signupFormData.sq2a+"', '"+signupFormData.sq3a+"')", Statement.RETURN_GENERATED_KEYS)
        st.execute()
        val rs = st.generatedKeys
        return if(rs.next()) {
            rs.getInt(1)
        }else{
            -1
        }

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
        return -1
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
        return -1
    }

    return -1
}

/**
 *  Given a quarantine user's quID, attempts to fetch all quarantine user information
 *  userID: the quID of the desired user
 *  return: a populated User object if the quID is exists, a null User otherwise
 */
fun loadQuarantineUserByID(userID : String) : User{
    var connection = getDBConnection()
    if(connection != null){
        return try{
            val preparedStatement = connection.prepareStatement("SELECT * FROM Database.Quarantine_Users WHERE quID = ?;")
            preparedStatement.setString(1, userID)
            val rs = preparedStatement.executeQuery()
            return if(rs.first()){
                User(rs.getString(FirstName),rs.getString(LastName),rs.getString(Email),rs.getString(Password),rs.getString(School), rs.getInt(ID))
            } else{
                User()
            }

        } catch(ex : SQLException){
            ex.printStackTrace()
            User()
        }
    }
    return User()
}

fun LoadQuarantineUser(email: String): User{
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
        val rs = st.executeQuery("SELECT * FROM Database.Quarantine_Users where email = \"$email\";")

        try{
            return if(rs.first()){
                User(rs.getString(FirstName),rs.getString(LastName),rs.getString(Email),rs.getString(Password),rs.getString(School), rs.getInt(ID))
            } else{
                User()
            }
        } catch (ex: SQLException){
            println("Error the query returned with a null result set. The query must have been entered incorrectly")
            ex.printStackTrace()
        }
        return User()

    } catch (ex: SQLException) {
        // handle any errors
        ex.printStackTrace()
    } catch (ex: Exception) {
        // handle any errors
        ex.printStackTrace()
    }
    return User()
}

fun DeleteQuarantineUser(user: User): Boolean{
    //This method is done when we simply want to delete a quarantine user
    //Currently it will only delete a single user with the same email address
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"
    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        //assuming we grabbed we already grabbed the user information
        st.executeUpdate("DELETE FROM Database.Quarantine_Users WHERE quID = '${user.id}'")

        //returns true when it has successfully deleted quarantine user
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

fun DeQuarantineUser(user: User): Boolean{
    //needs the information of the user we are passing in first
    val serverCredentials = serverCredential()
    val username = serverCredentials?.get(0)
    val password = serverCredentials?.get(1)
    val url = serverCredentials?.get(2)

    val connectionProps = Properties()
    connectionProps["user"] = username
    connectionProps["password"] = password
    connectionProps["useSSL"] = "false"
    try{
        //test the driver to make sure that it works
        Class.forName("com.mysql.jdbc.Driver")
        //Connection for the database to get it connected and then execute the query to insert the values into the database
        val conn = DriverManager.getConnection(url, connectionProps)
        val st = conn.createStatement()
        //assuming we grabbed we already grabbed the user information
        st.executeUpdate("INSERT INTO Database.Users (firstName, lastName, email, password, organization, question1, question2, question3, ans1, ans2, ans3)" +
                " VALUES('"+user.firstName+"', '"+user.lastName+"','"+user.email+"','"+user.password+"','"+user.school+"','"+user.securityQuestions[0].question+"','"+user.securityQuestions[1].question+"','"+user.securityQuestions[2].question+"', '"+user.securityQuestions[0].answer+"', '"+user.securityQuestions[1].answer+"', '"+user.securityQuestions[2].answer+"')")

        st.executeUpdate("DELETE FROM Database.Quarantine_Users WHERE quID = '${user.id}'")

        //For now I am not returning the now de-quarantine user
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