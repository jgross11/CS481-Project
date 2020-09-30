package edu.ycpcsp.ycpcsp.PostDataClasses

import java.lang.Exception
import java.lang.StringBuilder
import java.security.MessageDigest
import java.util.*
import javax.crypto.Cipher
import javax.crypto.spec.IvParameterSpec
import javax.crypto.spec.SecretKeySpec

class LoginFormData (var username : String, var password : String){
    override fun toString(): String {
        return "$username | $password"
    }
}

class LoginFormData2 (var username : String, var password : String){
    override fun toString(): String {
        return "$username | $password"
    }
}













