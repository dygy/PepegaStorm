package dygy.upgradle.webStorm

import javax.script.Invocable
import javax.script.ScriptException
import java.io.FileNotFoundException
import java.io.FileReader
import jdk.nashorn.api.scripting.NashornScriptEngineFactory
import java.io.StringWriter





internal object JSeval  {
    @Throws(FileNotFoundException::class, ScriptException::class, NoSuchMethodException::class)
    fun goJS(): String {
        val regex = "at line number (\\d+)"
        return try {
        val engine = NashornScriptEngineFactory().getScriptEngine("--language=es6")
        val sw = StringWriter()
        engine.context.writer = sw
            engine.eval(FileReader("C:\\Users\\yukim\\IdeaProjects\\webStorm\\src\\main\\resources\\client\\index.js"))
            val invocable = engine as Invocable
            val result = invocable.invokeFunction("fun")
            println("Result returned by eval(): $result")
            println("Captured output: $sw")
            sw.toString()
        } catch (e: ScriptException) {
            var thisNum = regex.toRegex(RegexOption.MULTILINE).find(e.toString())?.groups?.get(1)?.value.toString().toInt()
            thisNum -= 6
            e.toString().replace("javax.script.ScriptException:","").replace("in <eval>","").replace(regex.toRegex(),("at line number $thisNum"))
        }
    }
}