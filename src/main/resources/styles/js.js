const host = location.href.replace(/^http/, 'ws');
const ws = new WebSocket(host);
let output = document.querySelector('#terminal');
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg);
    if (msg['data'].substr(0,4)!=='IНPУ') {
        output.innerText = ' ' + msg['data']
    }
    else{
        input.value= msg['data'].substr(4,msg['data'].length)
    }
};
let toCompile =() =>{
    console.log('about to send '+document.querySelector('#code').value.toString() )
    ws.send('JS'+input.value);
};
let navigateTo=(href)=>{
    ws.send('NoJS'+input.value);
    location.replace(  href)
};

for (let x=0;x<25 ;x++){
    let para = document.createElement("span");                       // Create a <p> node
    let t = document.createTextNode((x + 1));      // Create a text node
    para.appendChild(t);                                          // Append the text to <p>
    document.getElementById("textArea").appendChild(para);           // Append <p> to <div> with id="myDIV"
}