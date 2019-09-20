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