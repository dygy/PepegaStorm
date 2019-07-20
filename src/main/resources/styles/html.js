const host = location.href.replace(/^http/, 'ws');
const ws = new WebSocket(host);
const output = document.querySelector('#terminal');

/*
input.value= "<!DOCTYPE html>\n" +
"<html lang=\"en\">\n" +
"<head>\n" +
"    <meta charset=\"UTF-8\">\n" +
"    <title>Title</title>\n" +
"</head>\n" +
"<body>\n" +
"\n" +
"</body>\n" +
"</html>"

 */
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg);
    input.innerText =' '+msg['data']
};
let toCompile =() =>{
    console.log('about to send '+input.innerText.toString());
    ws.send(input.innerText);
    openInNewTab('/run')
};
let openInNewTab=(url)=>{
    const win = window.open(url, '_blank');
    win.focus();
};

for (let x=0;x<25 ;x++){
    let para = document.createElement("span");                       // Create a <p> node
    let t = document.createTextNode((x + 1));      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("textArea").appendChild(para);           // Append <p> to <div> with id="myDIV"
}
let navigateTo=(href)=>{
    ws.send(input.innerText);
    location.replace(  href)
};
function getPos() {
    let sel = document.getSelection(),
        nd = sel.anchorNode,
        text = nd.textContent.slice(0, sel.focusOffset);

    const line = text.split("\n").length;
    const col = text.split("\n").pop().length;
}