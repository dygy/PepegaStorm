let lines=0;

for (lines;lines<input.clientHeight/19;++lines){
    let para = document.createElement("span");                       // Create a <p> node
    let t = document.createTextNode((lines + 1));      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("textArea").appendChild(para);           // Append <p> to <div> with id="myDIV"
}
input.addEventListener("new line",()=>{

},false);
let addLine =()=>{

    let para = document.createElement("span");                       // Create a <p> node
    let t = document.createTextNode((lines + 1));      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("textArea").appendChild(para);
    lines++
};
let deleteLine =()=>{
    const spans = document.getElementsByTagName("span");
    spans[spans.length-1].remove();
    lines--;
};
input.addEventListener('keydown', (event) => {
    console.log(event.which)
    if (event.which === 13) {
        if (input.clientHeight/lines >15) {
            addLine()
        }
    }
    else if (event.which === 8){
        console.log(input.clientHeight/lines);
        if (input.clientHeight/lines <15) {
            deleteLine();
        }
    }
    else if (event.which === 9){
        onKeyDown(event)
    }
});
function onKeyDown(e) {
    e.preventDefault();  // this will prevent us from tabbing out of the editor
    const doc = input.ownerDocument.defaultView;
    const sel = doc.getSelection();
    const range = sel.getRangeAt(0);

    const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0");
    range.insertNode(tabNode);

    range.setStartAfter(tabNode);
    range.setEndAfter(tabNode);
    sel.removeAllRanges();
    sel.addRange(range);
}

input.addEventListener("paste", function(e) {
    e.preventDefault();
    const text = (e.originalEvent || e).clipboardData.getData('text/plain');
    document.execCommand("insertText", false, text);
    /*
       setTimeout(()=>{
           input.innerHTML = input.innerHTML.replace(/(<.*?>)/g,"<br>")
       })

     */
});