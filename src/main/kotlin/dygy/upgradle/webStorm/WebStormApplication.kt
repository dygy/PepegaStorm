package dygy.upgradle.webStorm

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.features.StatusPages
import io.ktor.features.statusFile
import io.ktor.http.HttpStatusCode
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.files
import io.ktor.http.content.static
import io.ktor.http.content.staticRootFolder
import io.ktor.response.respond
import io.ktor.response.respondFile
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import java.io.File
import java.time.Duration

fun main() {
	val port = System.getenv("PORT")?.toInt() ?: 22496
	embeddedServer(
		Netty,
		watchPaths = listOf("./src/main"),
		port = port,
		module = Application::main
	).apply { start(wait = true) }
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

		webSocket("/js") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						when {
							text.substring(0,4)=="NoJS" -> {
								writeNoJS(text.substring(4, text.length))
								outgoing.send(Frame.Text(JSeval.goJS()))
							}
							text.substring(0, 2) == "JS" ->{
								writeJS(text.substring(2, text.length))
							}
						}
						println(text)
					}
				}
			}
		}
		webSocket("/html") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						val text = frame.readText()
						writeHTML(text)
						println(text)
					}
				}
			}
		}
		webSocket("/css") {
			for (frame in incoming){
				when (frame) {
					is Frame.Text -> {
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						writeCSS(text)
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
		get ("/js") {
			call.respondFile(File("./src/main/resources/js2.html"))
		}
		get ("/css") {
			call.respondFile(File("./src/main/resources/css.html"))
		}
		get ("/html") {
			call.respondFile(File("./src/main/resources/html.html"))
		}
		get("/run") {
			call.respondFile(File("./src/main/resources/client/client.html"))
		}
		get("/") {
			call.respondFile(File("./src/main/resources/error404.html"))
		}
	}
}