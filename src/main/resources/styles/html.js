const host = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(host);
const output = document.querySelector('#terminal');
const input = document.querySelector('#code');
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
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg);
    input.value =' '+msg['data']
};
let toCompile =() =>{
    console.log('about to send '+input.value.toString());
    ws.send("HTML "+input.value);
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
    ws.send('HTML'+input.value);
    location.replace(  href)
};