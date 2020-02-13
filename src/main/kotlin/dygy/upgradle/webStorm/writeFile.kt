package dygy.upgradle.webStorm

import java.io.File
import java.io.FileReader
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths

fun deleteDoc( fileName: String, fileRes: String){
    val fileName = "./src/main/resources/client/$fileName"
    val myfile = File(fileName).createNewFile()
    val content = ""
    val clientFileName = "./src/main/resources/styles/value${fileRes.toUpperCase()}.js"
    val clientFile = File(clientFileName)
    val code = "editor.setValue("+"\""+((content).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")

    val bool =  Files.delete(Paths.get(fileName))
    println("Delete $fileName")
}

fun createDoc( fileName: String, fileRes: String){
    val fileName = "./src/main/resources/client/$fileName"
    if (fileName.contains(".")) {
        val myfile = File(fileName).createNewFile()
        val content = ""
        val clientFileName = "./src/main/resources/styles/value${fileRes.toUpperCase()}.js"
        val clientFile = File(clientFileName)
        val code = "editor.setValue(" + "\"" + ((content).replace("\"", "\\\"").replace("\n", "\\n\"+\n\"") + "\")")
        clientFile.writeText(code)
        println("Create $fileName")
    }
}
fun setDoc(fileName :  String, fileRes:String){
    val fileName = "./src/main/resources/client/$fileName"
    val myfile = File(fileName)
    val content = File(fileName).readText(Charsets.UTF_8)
    val clientFileName = "./src/main/resources/styles/value${fileRes.toUpperCase()}.js"
    val clientFile = File(clientFileName)
    val code = "editor.setValue("+"\""+((content).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")
    clientFile.writeText(code)
    clientFile.writeText(code)
    println("Writed to $fileName")
}

fun writeJS(content: String ,fileName: String) {
    val fileName = if (fileName==="") { "./src/main/resources/client/client.js" }
    else{ "./src/main/resources/client/$fileName" }
    val myfile = File(fileName)
    var code = content
    myfile.writeText(code)
    val clientFileName = "./src/main/resources/styles/valueJS.js"
    val clientFile = File(clientFileName)
    code = "editor.setValue("+"\""+((content).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")
    clientFile.writeText(code)
    myfile.writeText(content)
    println("Writed to JS $fileName")

}

fun writeNoJS(content: String ,fileName: String) {
    val fileName = "./src/main/resources/client.js"
    val myfile = File(fileName)
    var code = "function fun (){ \n         const console = {\n" +
            "                log: print,\n" +
            "                warn: print,\n" +
            "                error: print\n" +
            "        };\n" +content+ "\n } "
    myfile.writeText(code)
    val clientFileName = "./src/main/resources/styles/valueJS.js"
    val clientFile = File(clientFileName)
    code = "editor.setValue("+"\""+((code).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")
    clientFile.writeText(code)
    println("Writed to NoJS $fileName")

}

fun writeHTML(content: String ,fileName: String) {
    val fileName = if (fileName==="") { "./src/main/resources/client/client.html" }
    else{ "./src/main/resources/client/$fileName" }
    val myfile = File(fileName)
    val clientFileName = "./src/main/resources/styles/valueHTML.js"
    val clientFile = File(clientFileName)
    val code = "editor.setValue("+"\""+((content).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")
    clientFile.writeText(code)
    myfile.writeText(content)
    println("Writed to HTML $fileName")
}

fun writeCSS(content: String ,fileName: String) {
    val fileName = if (fileName==="") { "./src/main/resources/client/client.css" }
    else{ "./src/main/resources/client/$fileName" }

    val myfile = File(fileName)
    val clientFileName = "./src/main/resources/styles/valueCSS.js"
    val clientFile = File(clientFileName)
    val code = "editor.setValue("+"\""+((content).replace("\"","\\\"").replace("\n", "\\n\"+\n\"")+"\")")
    clientFile.writeText(code)
    myfile.writeText(content)
    println("Writed to CSS $fileName")
}
fun getFiles(): MutableList<String> {
    val files: MutableList<String> =  mutableListOf()
    val dirPath = "./src/main/resources/client/"
    File(dirPath).walk().forEach {
        if (!it.name.equals("client")) {
            files.add(it.name)
        }
    }
    return files
}