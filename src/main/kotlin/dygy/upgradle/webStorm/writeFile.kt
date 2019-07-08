package dygy.upgradle.webStorm

import java.io.File

fun writeJS(content: String) {

    val fileName = "C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\index.js"
    val myfile = File(fileName)
    val code = "function fun (){ \n         const console = {\n" +
            "                log: print,\n" +
            "                warn: print,\n" +
            "                error: print\n" +
            "        };\n" +content+ "\n} "
    myfile.writeText(code)
    println("Writed to file")
}