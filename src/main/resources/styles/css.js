const host = location.href.replace(/^http/, 'ws');
const ws = new WebSocket(host);
const output = document.querySelector('#terminal');
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
    ws.send(input.innerText);
    location.replace(  href)
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