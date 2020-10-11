package edu.ycpcsp.ycpcsp.DataBase

import java.io.File
import java.io.FileNotFoundException
import java.io.InputStream


fun serverCredential(): MutableList<String>? {
    val lineList = mutableListOf<String>()
    try {
        val inputStream: InputStream = File("../../externalVariables.txt").inputStream()
        inputStream.bufferedReader().forEachLine { lineList.add(it) }
        try {
            //This is just a test pull to make sure the list is not empty
            //With this the problem will be isolated to it being an empty file
            var test = lineList[0]
            return lineList

        }catch (ex: IndexOutOfBoundsException){
            println("The file you directed the code towards has ")
            ex.printStackTrace()
        }
    } catch(ex: FileNotFoundException){
        println("The program was unable to find the Server Credentials")
        println("Make sure you have correctly downloaded the right file")
        ex.printStackTrace()
    }
    return lineList
}