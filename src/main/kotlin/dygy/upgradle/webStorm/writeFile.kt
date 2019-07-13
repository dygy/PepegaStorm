package dygy.upgradle.webStorm

import java.io.File

fun writeJS(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.js"
    val myfile = File(fileName)
    val code = "function fun (){ \n         const console = {\n" +
            "                log: print,\n" +
            "                warn: print,\n" +
            "                error: print\n" +
            "        };\n" +content+ "\n } "
    myfile.writeText(code)
    println("Writed to JS")

}
fun writeHTML(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.html"
    val myfile = File(fileName)
    val code = content
    myfile.writeText(code)
    println("Writed to HTML")

}
fun writeCSS(content: String) {
    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.css"
    val myfile = File(fileName)
    val code = content
    myfile.writeText(code)
    println("Writed to CSS")

}