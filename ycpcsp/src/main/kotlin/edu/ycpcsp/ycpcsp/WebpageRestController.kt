package edu.ycpcsp.ycpcsp

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpSession

@RestController
class WebpageRestController {
    @GetMapping("/getSession", produces = ["application/json"])
    fun getHTTPSession(session : HttpSession): String{
        if(session.attributeNames.toList().isNotEmpty()) {
            var result = "{\n"
            var attributeList = session.attributeNames.toList()
            for (i in 0..attributeList.size - 2) {
                var attribute = attributeList[i]
                result += "$attribute: \"${session.getAttribute(attribute)}\",\n"
            }
            result += "${attributeList[attributeList.size - 1]}: \"${session.getAttribute(attributeList[attributeList.size - 1])}\"\n"
            result += "}"
            println(result)
            return result
        }
        else{
            return "null"
        }
    }
}