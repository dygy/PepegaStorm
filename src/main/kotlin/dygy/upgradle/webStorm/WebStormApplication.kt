package dygy.upgradle.webStorm

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.*
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.files
import io.ktor.http.content.static
import io.ktor.http.content.staticRootFolder
import io.ktor.response.respond
import io.ktor.response.respondFile
import io.ktor.response.respondRedirect
import io.ktor.response.respondText
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import java.io.File
import java.time.Duration

fun main() {
	val port = System.getenv("PORT")?.toInt() ?: 8080
	embeddedServer(
		Netty,
		watchPaths = listOf("./src/main"),
		port = port,
		module = Application::main
	).apply { start(true) }
}
fun getFirstFile(fileRes: String): String{
	var arr = getFiles()
	for (el in arr){
		if (getFileRes(el)===fileRes){
			return el
		}
	}
	return "!false."
}
fun getFileRes(fileName: String ): String {
	var fileRes="";
	var start=false;
	for ( y in fileName){
		if (y=='.'){
			start= true;
		}
		else if (start){
			fileRes+=y
		}
	}
	println(fileRes)
	return  fileRes
}
fun Application.main() {
	install(StatusPages) {
		statusFile(HttpStatusCode.NotFound, HttpStatusCode.Unauthorized, filePattern = "./src/main/resources/error404.html")
	}
	// This adds automatically Date and Server headers to each response, and would allow you to configure
	// additional headers served to each response.
	install(DefaultHeaders)
	// This uses use the logger to log every call (request/response)
	install(CallLogging)
	/**
	 * Install Websocket
	 */
	install(WebSockets) {
		pingPeriod = Duration.ofSeconds(300)
		timeout = Duration.ofSeconds(100)
		maxFrameSize = Long.MAX_VALUE
		masking = false
	}
	routing {
		webSocket("/js/{fileName}") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						val text = frame.readText()
						var x = call.parameters["fileName"]
						x = x?.replace('^','.')
						when {
							text.substring(0, 2) == "JS" ->{
								writeJS(text.substring(2, text.length),x.orEmpty()+"")
							}
							text.substring(0,4)=="NoJS" -> {
								writeNoJS(text.substring(4, text.length),x.orEmpty())
								outgoing.send(Frame.Text(JSeval.goJS()))
							}
						}
						println(text)
					}
				}
			}
		}
		webSocket("/html/{fileName}") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						var x = call.parameters["fileName"]
						x = x?.replace('^','.')
						val text = frame.readText()
						writeHTML(text,x.orEmpty())
						println(text)
					}
				}
			}
		}
		webSocket("/css/{fileName}") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						var x = call.parameters["fileName"]
						x = x?.replace('^','.')
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						writeCSS(text,x.orEmpty())
						println(text)
					}
				}
			}
		}
		static("/") {
			staticRootFolder = File("./src/main/resources")
			files("styles")
			files("client")
		}
		post("/delete/{fileName}") {
			val x = call.parameters["fileName"]
			val fileRes = getFileRes(x.orEmpty())
			if (x !== null) {
				deleteDoc(x, fileRes)
				//call.respond(true)
			}
			else{
				//call.respond(true)
			}
		}
		get ("/create/{fileName}") {
			val x = call.parameters["fileName"]
			val fileRes = getFileRes(x.orEmpty())
			if (x !== null) {
				createDoc(x, fileRes)
			}
			call.respondFile(File("./src/main/resources/$fileRes.html"))
		}
		get ("/file/{fileName}") {
			var x = call.parameters["fileName"]
			x =x?.replace('^','.')
			println(x)
			var fileRes = getFileRes(x.toString())
			if (File("./src/main/resources/client/${x}").isFile) {
				setDoc(x.orEmpty(),fileRes)
				call.respondFile(File("./src/main/resources/$fileRes.html"))
			}
			else{
				call.respondFile(File("./src/main/resources/error404.html"))
			}
		}
		get ("/files") {
			call.respondText(getFiles().toString())
		}
        get ("/create/{fileName}") {
            val x = call.parameters["fileName"]
            val fileRes = getFileRes(x.orEmpty())
            if (x !== null) {
                createDoc(x, fileRes)
            }
            call.respondFile(File("./src/main/resources/$fileRes.html"))
        }
        get ("/run/{fileName}") {
            val x = call.parameters["fileName"]
            val fileRes = getFileRes(x.orEmpty())
            if(fileRes=="html") {
                call.respondFile(File("./src/main/resources/client/$x"))
            }
            else{
                call.respondFile(File("./src/main/resources/client/client.html"))
            }
        }
        get("/") {
			call.respondFile(File("./src/main/resources/error404.html"))
		}
	}
}