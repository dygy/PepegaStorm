package dygy.upgradle.webStorm

import io.ktor.application.call
import io.ktor.response.respondFile
import io.ktor.routing.get
import io.ktor.routing.routing
import io.ktor.server.engine.embeddedServer
import io.ktor.server.netty.Netty
import java.io.File
import dygy.upgradle.webStorm.JSeval
import dygy.upgradle.webStorm.writeJS
import io.ktor.application.*
import io.ktor.response.*
import io.ktor.request.*
import io.ktor.routing.*
import io.ktor.http.*
import com.fasterxml.jackson.databind.*
import io.ktor.jackson.*
import io.ktor.features.*
import io.ktor.http.cio.websocket.CloseReason
import io.ktor.http.cio.websocket.Frame
import io.ktor.http.cio.websocket.close
import io.ktor.http.cio.websocket.readText
import io.ktor.websocket.WebSockets
import io.ktor.websocket.webSocket
import java.time.Duration
fun main(args: Array<String>) {
	install(WebSockets)
	install(WebSockets) {
		pingPeriod = Duration.ofSeconds(60) // Disabled (null) by default
		timeout = Duration.ofSeconds(15)
		maxFrameSize = Long.MAX_VALUE // Disabled (max value). The connection will be closed if surpassed this length.
		masking = false
	}
	writeJS("console.log(1);console.log(1);")
	println("JS output: "+JSeval.goJS())
	val server = embeddedServer(Netty, port = 8080) {
		routing {
			get("/") {
				call.respondFile(File("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\index.html"))
				for (frame in incoming) {
					when (frame) {
						is Frame.Text -> {
							val text = frame.readText()
							outgoing.send(Frame.Text("YOU SAID: $text"))
							if (text.equals("bye", ignoreCase = true)) {
								close(CloseReason(CloseReason.Codes.NORMAL, "Client said BYE"))
							}
						}
					}
				}
			}
		}
	}
	server.start(wait = true)
}