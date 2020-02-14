let curFile="";
const regex = /\/(?:.(?!\/))+$/;
const str = location.href.toString().replace('%5E',".");
let m;
if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        curFile=match.replace('/','')
    });
}

let spinners=0;

function spinner() {
    document.getElementsByTagName("img")[0].style.transform = `translateX(10px)`
    for (let x = 0; x < 1450; x++) {
        setTimeout(() => {
            document.getElementsByTagName("img")[0].style.transform = `rotate(${x}deg)`
        }, 700);
    }
    setTimeout(() => {
        document.getElementsByTagName("img")[0].style.transform = `translateX(-20px)`
        for (let x = 0; x < 1450; x++) {
            setTimeout(() => {
                document.getElementsByTagName("img")[0].style.transform = `rotate(${-x}deg)`
            }, 700);
        }
    }, 1000);
    setTimeout(() => {
        if (spinners < 10) {
            spinners++;
            spinner()
        } else {
            spinners = 0
        }
    },3000)
}
function createFileMenu(){
    if (document.getElementById('CFM').style.display!=="block") {
        document.getElementById('CFM').style.display = "block"
    }
    else {
        document.getElementById('CFM').style.display= "none"
    }
}
function createFile(){
    const fileName = document.getElementById("fileName").value
    let fileRes='';
    if (!fileName || fileName ==="" || typeof fileName !== "string"){
        alert("ILLEGAL TYPE OF NAME");
        return null;
    }
    let started = false;
    for (let x=0;x<fileName.length;x++){
        if (fileName[x]===".") {
            started= true
        }
        else if (started){
            fileRes+=fileName[x];
        }
    }
    console.log(fileRes);
    if (fileRes !== "js" && fileRes !== "html" && fileRes !== "css"){
        alert("ILLEGAL TYPE OF FILE RESOLUTION")
    }
    else {
        navigateTo(`/create/${fileName}`)
    }
}
getFiles().then();
async function delFile(name) {
    fetching(`/delete/${name}`,"POST")
}
async function getFiles() {
    fetching("/files","GET")
}
async function setFiles(str) {
    str = str.replace("[", '');
    str = str.replace("]", '');
    let arr = str.split(",");
    for (let x = 0; x < arr.length; x++) {
        arr[x] = arr[x].replace(" ", '');
        document.getElementById("lefbar").innerHTML +=
            `<span style="padding-top: 5px;display: flex;flex-direction: row-reverse; justify-content: flex-end; align-items: center" id="file${x}" oncontextmenu="{document.getElementById('file'+${x}).remove();delFile('${arr[x]}')}" onclick="navigateTo('/file/${arr[x].replace('.', '^')}')">
                       <text>${arr[x]}</text> 
                            </span>`
        if (arr[x].includes("css")){
            document.getElementById(`file${x}`).innerHTML+=`<img style="min-width: 19px;padding-left: 2px; height: 23px; margin-right: 3px " src="https://vignette.wikia.nocookie.net/wikies/images/a/a9/CSS3.png/revision/latest/scale-to-width-down/340?cb=20160909123652&path-prefix=ru"/>`
        }
        else if (arr[x].includes("html")){
            document.getElementById(`file${x}`).innerHTML+=`<img style="min-width: 22px; height: 20px; margin-right: 3px " src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/1200px-HTML5_logo_and_wordmark.svg.png"/>`
        }
        else {
            document.getElementById(`file${x}`).innerHTML+=`<img style="min-width: 22px; height: 20px; margin-right: 3px " src="https://dmitro.pro/wp-content/uploads/2018/03/js-logo.png"/>`
        }
        document.getElementById(`file${x}`).addEventListener('contextmenu', function(ev) {
            ev.preventDefault(); return false; }, false);
    }
    document.getElementById("lefbar").innerHTML +=
        `<div id="CFF" oncontextmenu="createFileMenu()" style="height: 68.5vh;max-height: 84%;width: 100%; "> </div>`
    document.getElementById("CFF").addEventListener('contextmenu', function(ev) {
        ev.preventDefault(); return false; }, false);
}
async function fetching(url,met) {
    await fetch(url,{method:met})
        .then(response=>{
            return response.text()
        })
        .then(function (defs) {
            console.log(defs);
            if (url ==="/files"){
                setFiles(defs)
            }
            else {
                return  defs;
            }
        })
        .catch(
            // Отправить на сервер для метрики
        )
    }
