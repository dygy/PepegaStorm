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
getFiles();
async function getFiles() {
    await fetch("./files")
        .then(response=>{
            return response.text()
        })
        .then(function (defs) {
            console.log(defs);
            let str= defs;
            str =  str.replace("[",'');
            str = str.replace("]",'');
            let arr = str.split(",");
            for (let x = 0; x<arr.length;x++){
                arr[x] = arr[x].replace(" ",'');
                document.getElementById("lefbar").innerHTML+=
                    `<span onclick="navigateTo('./file/${arr[x].replace('.','^')}')">
                        ${arr[x]}
                            </span>`
            }
        })
        .catch(
            // Отправить на сервер для метрики
        );
}
