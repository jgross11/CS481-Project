package edu.ycpcsp.ycpcsp.DataBase

import java.io.File
import java.io.FileNotFoundException
import java.io.InputStream

var username = ""
var password = ""
var url = ""

fun main() {
    try {
        val inputStream: InputStream = File("../../externalVariables.txt").inputStream()
        val lineList = mutableListOf<String>()

        inputStream.bufferedReader().forEachLine { lineList.add(it) }
        try {
            username = lineList[0]
            password = lineList[1]
            url = lineList[2]
        }catch (ex: IndexOutOfBoundsException){
            println("The file you directed the code towards has ")
            ex.printStackTrace()
        }
    } catch(ex: FileNotFoundException){
        println("The program was unable to find the Server Credentials")
        println("Make sure you have correctly downloaded the right file")
        ex.printStackTrace()
    }
}

fun serverCredential(){
    try {
        val inputStream: InputStream = File("../../externalVariables.txt").inputStream()
        val lineList = mutableListOf<String>()

        inputStream.bufferedReader().forEachLine { lineList.add(it) }
        try {
            username = lineList[0]
            password = lineList[1]
            url = lineList[2]
        }catch (ex: IndexOutOfBoundsException){
            println("The file you directed the code towards has ")
            ex.printStackTrace()
        }
    } catch(ex: FileNotFoundException){
        println("The program was unable to find the Server Credentials")
        println("Make sure you have correctly downloaded the right file")
        ex.printStackTrace()
    }
}