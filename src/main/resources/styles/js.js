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
        output.innerText = '' + msg['data']
    }
    else{
        editor.setValue(msg['data'].substr(4,msg['data'].length));
    }
};
let toCompile =() =>{
    console.log('about to send '+editor.value)
    ws.send('NoJS'+editor.getValue("\n"));
};
let navigateTo=(href)=>{
    ws.send('JS'+editor.getValue("\n"));
    location.replace(href)
};

