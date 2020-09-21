package edu.ycpcsp.ycpcsp

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class YcpcspApplication

fun main(args: Array<String>) {
	runApplication<YcpcspApplication>(*args)
}
