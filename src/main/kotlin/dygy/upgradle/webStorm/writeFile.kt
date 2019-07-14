package dygy.upgradle.webStorm

import java.io.File

fun writeJS(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.js"
    val myfile = File(fileName)
    var code = "function fun (){ \n         const console = {\n" +
            "                log: print,\n" +
            "                warn: print,\n" +
            "                error: print\n" +
            "        };\n" +content+ "\n } "
    myfile.writeText(code)
    val clientFileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\styles\\valueJS.js"
    val clientFile = File(clientFileName)
    code = "const input = document.querySelector('#code')\n" +
            "input.value= "+"\" "+((content).replace("\"","\\\"").replace("\n", "\\n \" + \n \"")+"\"")
    clientFile.writeText(code)
    clientFile.writeText(code)
    println("Writed to JS")

}
fun writeHTML(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.html"
    val myfile = File(fileName)
    val clientFileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\styles\\valueHTML.js"
    val clientFile = File(clientFileName)
    val code = "const input = document.querySelector('#code')\n" +
            "input.value= "+"\" "+((content).replace("\"","\\\"").replace("\n", "\\n \" + \n \"")+"\"")
    clientFile.writeText(code)
    myfile.writeText(content)
    println("Writed to HTML")

}
fun writeCSS(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.css"
    val myfile = File(fileName)
    val clientFileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\styles\\valueCSS.js"
    val clientFile = File(clientFileName)
    val code = "const input = document.querySelector('#code')\n" +
            "input.value= "+"\" "+((content).replace("\"","\\\"").replace("\n", "\\n \" + \n \"")+"\"")
    clientFile.writeText(code)
    myfile.writeText(content)
    println("Writed to CSS")

}