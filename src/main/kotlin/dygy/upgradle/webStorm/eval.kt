package dygy.upgradle.webStorm

import javax.script.Invocable
import javax.script.ScriptEngine
import javax.script.ScriptEngineManager
import javax.script.ScriptException
import java.io.FileNotFoundException
import java.io.FileReader
import jdk.nashorn.api.scripting.NashornScriptEngineFactory
import java.io.StringWriter





internal object JSeval  {
    @Throws(FileNotFoundException::class, ScriptException::class, NoSuchMethodException::class)
    fun goJS(): String {
        val engine = NashornScriptEngineFactory().getScriptEngine("--language=es6")
        val sw = StringWriter()
        engine.context.writer = sw
        return try {
            engine.eval(FileReader("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\index.js"))
            val invocable = engine as Invocable
            val result = invocable.invokeFunction("fun")
            println("Result returned by eval(): $result")
            println("Captured output: $sw")
            sw.toString()
        } catch (e: ScriptException) {
            e.printStackTrace().toString()
        }
    }
}