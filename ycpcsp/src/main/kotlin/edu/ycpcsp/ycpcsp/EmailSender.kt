package edu.ycpcsp.ycpcsp

import edu.ycpcsp.ycpcsp.DataBase.serverCredential
import java.util.*
import javax.mail.*
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage


class EmailSender {

    fun sendMessage() {
        val to = "jgross11@ycp.edu"
        var subject: String = "Test email"
        val serverCredentials = serverCredential()
        val from = serverCredentials?.get(3)
        val username = serverCredentials?.get(4)
        val password = serverCredentials?.get(5)
        val mailer = "Kotlin Project"
        val host: String = "smtp.gmail.com"
        val properties = Properties()
        properties["mail.smtp.auth"] = "true"
        properties["mail.smtp.starttls.enable"] = "true"
        properties["mail.smtp.host"] = host
        properties["mail.smtp.port"] = "587"
        val record: String? = null // name of folder in which to record mail
        val session = Session.getInstance(properties,
                object : Authenticator() {
                    override fun getPasswordAuthentication(): PasswordAuthentication {
                        return PasswordAuthentication(username, password)
                    }
                })
        try {
            // Create a default MimeMessage object.
            val message: Message = MimeMessage(session)

            // Set From: header field of the header.
            message.setFrom(InternetAddress(from))

            // Set To: header field of the header.
            message.setRecipients(Message.RecipientType.TO,
                    InternetAddress.parse(to))

            // Set Subject: header field
            message.subject = "Testing Subject"

            // Now set the actual message
            message.setText("Hello, this is sample for to check send "
                    + "email using JavaMailAPI ")

            // Send message
            Transport.send(message)


        } catch (e: MessagingException) {
            throw RuntimeException(e);
        }

        var debug = false
        var optind: Int = 0
    }
}