function fun (){ 
         const console = {
                log: print,
                warn: print,
                error: print
        };
let x = 0;
for(x;x<100;x++){
  document.body.innerHTML+=""+(x*x)/(x+x)
  console.log((x*x)/(x+x))
}

 } 