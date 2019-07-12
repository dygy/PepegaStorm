const host = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(host);
let lastMessage = '';
let output = document.querySelector('#terminal');
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg)
    output.innerText =' '+msg['data']
};

let antiSpam= (message) =>{
    if (message !== lastMessage) {
        lastMessage = message;
        output.innerText ='';
        ws.send(message)
    }
};
let toCompile =() =>{
    console.log('about to send '+document.querySelector('#code').value.toString() )
    antiSpam(document.querySelector('#code').value.toString());
};

for (let x=0;x<25 ;x++){
    let para = document.createElement("span");                       // Create a <p> node
    let t = document.createTextNode((x + 1));      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("textArea").appendChild(para);           // Append <p> to <div> with id="myDIV"
}