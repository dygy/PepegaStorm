package dygy.upgradle.webStorm

import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.features.CallLogging
import io.ktor.features.DefaultHeaders
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.readText
import io.ktor.http.content.files
import io.ktor.http.content.static
import io.ktor.http.content.staticRootFolder
import io.ktor.response.respondFile
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import kotlinx.coroutines.ObsoleteCoroutinesApi
import java.io.File
import java.time.Duration

fun main() {
	embeddedServer(
		Netty,
		watchPaths = listOf("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main"),
		port = 8080,
		module = Application::main
	).apply { start(wait = true) }
}
@ObsoleteCoroutinesApi
fun Application.main() {
	// This adds automatically Date and Server headers to each response, and would allow you to configure
	// additional headers served to each response.
	install(DefaultHeaders)
	// This uses use the logger to log every call (request/response)
	install(CallLogging)
	/**
	 * Install Websocket
	 */

	install(WebSockets) {
		pingPeriod = Duration.ofSeconds(60)
		timeout = Duration.ofSeconds(15)
		maxFrameSize = Long.MAX_VALUE
		masking = false

	}

	routing {
		webSocket("/js") {
			while (true) {
				when (val frame = incoming.receiveOrNull()) {
					is Frame.Text -> {
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						when {
							text.substring(0,4)=="HTML" -> {
								writeHTML(text.substring(4, text.length))
							}
							text.substring(0,4)=="NoJS" -> {
								writeJS(text.substring(4, text.length))
							}
							text.substring(0, 2) == "JS" ->{
								writeJS(text.substring(2, text.length))
								outgoing.send(Frame.Text(JSeval.goJS()))
							}
							text.substring(0,3)=="CSS" -> {
								writeCSS(text.substring(3, text.length))
							}
						}
						println(text)
					}
				}
			}

		}
		webSocket("/html") {
			while (true) {
				when (val frame = incoming.receiveOrNull()) {
					is Frame.Text -> {
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						when {
							text.substring(0,4)=="HTML" -> {
								writeHTML(text.substring(4, text.length))
							}
							text.substring(0,4)=="NoJS" -> {
								writeJS(text.substring(4, text.length))
							}
							text.substring(0, 2) == "JS" ->{
								writeJS(text.substring(2, text.length))
								outgoing.send(Frame.Text(JSeval.goJS()))
							}
							text.substring(0,3)=="CSS" -> {
								writeCSS(text.substring(3, text.length))
							}
						}
						println(text)
					}
				}
			}

		}
		webSocket("/css") {
			while (true) {
				when (val frame = incoming.receiveOrNull()) {
					is Frame.Text -> {
						val text = frame.readText()
						//println(text.substring(0,4) == "HTML")
						when {
							text.substring(0,4)=="HTML" -> {
								writeHTML(text.substring(4, text.length))
							}
							text.substring(0,4)=="NoJS" -> {
								writeJS(text.substring(4, text.length))
							}
							text.substring(0, 2) == "JS" ->{
								writeJS(text.substring(2, text.length))
								outgoing.send(Frame.Text(JSeval.goJS()))
							}
							text.substring(0,3)=="CSS" -> {
								writeCSS(text.substring(3, text.length))
							}
						}
						println(text)
					}
				}
			}

		}
		static("/") {
			staticRootFolder = File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources")
			files("styles")
			files("client")
		}
		get ("/js") {
			call.respondFile(File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\js.html"))

		}
		get ("/css") {
			call.respondFile(File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\css.html"))
		}
		get ("/html") {
			call.respondFile(File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\html.html"))
		}
		get("/run") {
			call.respondFile(File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\client.html"))
		}
	}
}
