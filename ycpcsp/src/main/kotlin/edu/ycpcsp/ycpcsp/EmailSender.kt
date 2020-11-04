package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.serverCredential
import edu.ycpcsp.ycpcsp.Models.User
import java.util.*
import javax.mail.*
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

/**
 *  This class will contains all functions relating to sending emails
 */
class EmailSender {

    // read sender credential file
    val serverCredentials = serverCredential()

    // sender email address
    val from = serverCredentials?.get(3)

    // sender username
    val username = serverCredentials?.get(4)

    // sender password
    val password = serverCredentials?.get(5)

    // given a User object, formats a new user signup email
    // to the User's email, utilizing the User's name and ID.
    // returns true if email is sent, false otherwise

    fun sendSignupEmail(user : User) : Boolean{
        val to = user.email
        val subject = "Welcome, ${user.getFullName()}, to YCPCSP!"
        val body = "Thank you for signing up to YCPCSP, ${user.getFullName()}.\n\n" +
                "Before you can access full functionality of the website, we need to verify that you created this account.\n" +
                "Please click the following link to verify your account:\n\n" +
                "$rootWebAddress/verify/${user.id}\n\n" +
                "Thank you, \n" +
                "- The YCPCSP Team."
        return sendMessage(to, subject, body)
    }

    // given a User object, formats and sends a forgot password email
    // to the user's email, utilizing the User's name and ID.
    // returns true if email is sent, false otherwise
    fun sendForgotPasswordEmail(user : User) : Boolean{
        val to = user.email
        val subject = "Recover your password"
        val body = "Hello ${user.getFullName()}, \n" +
                "\n" +
                "You recently indicated that you wish to recover your password for your YCPCSP account. \n" +
                "Please click the following link to reset your password:\n" +
                "\n" +
                "${rootWebAddress}/recoverPassword/${user.id}\n" +
                "\n" +
                "Thank you,\n" +
                "- The YCPCSP Team"
        return sendMessage(to, subject, body)
    }

    // given a 'to' address, a subject line, and a body,
    // constructs and sends an email to that address with
    // the given subject and body.
    // returns true if email is sent, false otherwise
    private fun sendMessage(to : String, subject : String, body : String) : Boolean {
        var result = true
        val properties = Properties()

        // emailing through gmail requires the following settings
        properties["mail.smtp.auth"] = "true"
        properties["mail.smtp.starttls.enable"] = "true"
        properties["mail.smtp.host"] = "smtp.gmail.com"
        properties["mail.smtp.port"] = "587"

        // verify sender email and obtain session
        val session = Session.getInstance(properties,
                object : Authenticator() {
                    override fun getPasswordAuthentication(): PasswordAuthentication {
                        return PasswordAuthentication(username, password)
                    }
                })
        try {
            // create Mime message
            val message: Message = MimeMessage(session)

            // set from field
            message.setFrom(InternetAddress(from))

            // set to field
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))

            // set subject field
            message.subject = subject

            // set the body
            message.setText(body)

            // send message
            Transport.send(message)


        } catch (e: MessagingException) {
            // most likely means email failed to send, so should return false
            result = false
            throw RuntimeException(e);
        }

        return result
    }
}