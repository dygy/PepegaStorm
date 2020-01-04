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
