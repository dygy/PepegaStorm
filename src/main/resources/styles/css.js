const host = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(host);
const output = document.querySelector('#terminal');
const input = document.querySelector('#code');
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg);
    input.value =' '+msg['data']
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