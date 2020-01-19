const host = (location.origin+"/css/"+curFile).replace(/^http/, 'ws');
const ws = new WebSocket(host);
const output = document.querySelector('#terminal');
ws.onopen = () =>{
    console.log('websocket is connected ...');
    // sending a send event to websocket server
};
ws.onmessage = (msg) =>{
    console.log(msg);
    editor.setValue(''+msg['data'])
};
let navigateTo=(href)=>{
    ws.send(editor.getValue("\n"));
    location.replace(href)
};
let toCompile =() =>{
    console.log('about to send '+editor.getValue("\n"));
    ws.send(editor.getValue("\n"));
    openInNewTab('/run')
};
let openInNewTab=(url)=>{
    const win = window.open(url, '_blank');
    win.focus();
};