const keywords = [
    "var","let","function","async",
    "await","const","if","else","switch","case","break", "yield",
    "do", "while", "for"
]
let range = document.createRange();
const sel = window.getSelection();
try {
    range.setStart(input.childNodes[2], 5);
}
catch (e) {
}
range.collapse(true);
sel.removeAllRanges();
sel.addRange(range);
function lexering() {
    getStr();
    // group one - comments |gray  |
    // group two - keywords |orange|
    // group three - funcs  |yellow|
    // group four - props   |purple|
    // parse str and regex  |green |

    const exps=[];
    const regex = / ?(const|var|let|function|async|await| const|if|else|switch|case|break|yield|do|while |for|try|catch|return|true|false|undefiend) |([A-Za-z0-9]*) *\(.*\)|\.([A-Za-z0-9]*) */gm;
    let m;

    while ((m = regex.exec(input.innerHTML)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable.
        m.forEach(function(match,groupIndex) {
            console.log(match);
            if (match !== undefined && match!=="" && groupIndex!==0) {
                exps.push({
                    exp:match,
                    type: groupIndex,
                    index: arguments[2].index,
                    lastIndex:arguments[2].index+match.length
                });
                //console.log(`Found match, group ${groupIndex}: ${match}`);
            }});
    }
    exps.forEach((i)=>{
        console.log(i);
        if (i.type === 1){
            input.innerHTML= store(i.index,i.lastIndex,`<text class="keyword"  contenteditable="false">${i.exp}</text>`,input.innerHTML,"keyword")
        }
        else if (i.type === 2){
            input.innerHTML= store(i.index,i.lastIndex,`<text class="functio"  contenteditable="false">${i.exp}</text>`,input.innerHTML, "functio")
        }
        else if (i.type === 3){
            input.innerHTML= store(i.index,i.lastIndex,`<text class="propper"  contenteditable="true">${i.exp}</text>`,input.innerHTML, "propper")
        }
    })

    //concater();

}
function chekSpam(string,index) {
    if(string.substr(index-20,index).contains('<text class="string"')){
        return true
    }
    else {
        return false
    }
}
function getStr() {
    let arr = [];
    let startTwo=null;
    let endTwo=null;
    let startOne=null;
    let endOne=null;
    let comstart = null;
    //input.innerHTML = store(comstart - 1, y - 1, `<text class="comment"  contenteditable="true">${input.innerHTML.substr(comstart, y - 1)}</text>`, input.innerHTML, "comment")
    //input.innerHTML= store(startOne,endOne,`<text class="string"  contenteditable="true">${input.innerHTML.substr(startOne,endOne)}</text>`,input.innerHTML, "string");
    //input.innerHTML= store(startTwo,endTwo,`<text class="string"  contenteditable="true">${input.innerHTML.substr(startTwo,endTwo)}</text>`,input.innerHTML, "string");
    for (let x=0;x<input.innerHTML.length;x++){
        if ( input.innerHTML[x]==="<" && input.innerHTML[x+1]==="t" && input.innerHTML[x+2]==="e"){
            console.log(input.innerHTML[x]+"    2   ");
            let changed =false
            for (let y=x;y<input.innerHTML.length;y++){
                if (input.innerHTML[y]==="/"&&input.innerHTML[y+1]==="t"&&input.innerHTML[y+1]==="e"){
                    x=y+5;
                    console.log(input.innerHTML[x]+"    1   ");
                    y= input.innerHTML.length;
                    changed=true;
                }
            }
            if (!changed){
                x=input.innerHTML.length
            }
        }
        else if (input.innerHTML[x]==="/" && input.innerHTML[x+1]==="/"){
            comstart=x;
            for (let y=comstart;y<input.innerHTML.length;y++) {
                if (input.innerHTML.length > y + 2) {
                    if (input.innerHTML[y] === "<" && input.innerHTML[y + 1] === "b" && input.innerHTML[y + 2] === "r") {
                        /*
                        arr.push({
                            start:comstart,
                            end: y-1,
                            type: "comment",
                            value:input.innerHTML.substr(comstart,y-1)
                        });
                         */
                        input.innerHTML = store(comstart - 1, y - 1, `<text class="comment"  contenteditable="true">${input.innerHTML.substr(comstart, y-comstart)}</text>`, input.innerHTML, "comment")
                        comstart = null;
                        y = input.innerHTML.length;
                        x = y - 1;
                    }
                }
            }
        }
        else if (input.innerHTML[x]==="'" && startOne===null){
            startOne = x;
        }
        else if (input.innerHTML[x]==="'" && startOne!==null){
            endOne = x;
            input.innerHTML= store(startOne,endOne,`<text class="string"  contenteditable="true">${input.innerHTML.substr(startOne,endOne-startOne+1)}</text>`,input.innerHTML, "string");
            console.log(startOne+" "+endOne);
            startOne = null;
            endOne = null;
            x=0
        }
        else if (input.innerHTML[x]==='"' && startTwo===null){
            startTwo = x;
        }
        else if (input.innerHTML[x]==='"' && startTwo!==null){
            endTwo = x;
            console.log(startTwo+" "+endTwo);
            //input.innerHTML=store(startTwo,endTwo, `<text class="string"  contenteditable="true">${input.innerHTML.substr(startTwo,endTwo-startTwo+1)}</text>`,input.innerHTML, "string");
            startTwo = null;
            endTwo = null;
            //x=0
            //TODO; think how to get last index  of created tag
        }

    }
}
function store(index, lastIndex, value, string, type) {
    //TODO: Store info
    let left = string.substr(0,index);
    const middle = value;
    let right;
    console.log(value+" !!!");
    if (type === "functio"){
        right = string.substr(lastIndex, string.length-lastIndex);
        return left+" "+middle+" "+right;
    }
    else if (type==="string"){
        right = string.substr(lastIndex+1, string.length-lastIndex-2);
        return left+" "+middle+" "+right;
    }
    else if (type==="propper"){
        left = string.substr(0,index+1);
        right = string.substr(lastIndex + 1, string.length-lastIndex);
        return left+" "+middle+" "+right;
    }
    else {
        right = string.substr(lastIndex + 1, string.length-lastIndex-1);
        return left+" "+middle+" "+right;
    }
}
function concater() {
    //TODO: create HTML Text;
}

input.addEventListener("input",function (e) {
    const caretPos = getCurrentCursorPosition("code")+9;
    lexering();
    setCurrentCursorPosition(caretPos)

},false);

const getContext =(index,text)=>{
    let leftBorder=null;
    let rightBorder=null;
    let notOver = true;
    for (let x=index;x>0 && notOver;x--){
        if (text[x]==='.'||text[x]===' '||text[x]===';'){
            leftBorder = x+1;
            notOver= false;
        }
    }
    notOver =true;
    for (let x=index;x<text.length && notOver;x++){
        if (text[x]==='.'||text[x]===' '||text[x]===';'){
            rightBorder = x;
            notOver= false;
        }
    }
    if (leftBorder ===null){
        leftBorder=0
    }
    if (rightBorder===null){
        rightBorder = text.length;
    }
    return text.substr(leftBorder,rightBorder-leftBorder)
};

function createRange(node, chars, range) {
    if (!range) {
        range = document.createRange()
        range.selectNode(node);
        range.setStart(node, 0);
    }

    if (chars.count === 0) {
        range.setEnd(node, chars.count);
    } else if (node && chars.count >0) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent.length < chars.count) {
                chars.count -= node.textContent.length;
            } else {
                range.setEnd(node, chars.count);
                chars.count = 0;
            }
        } else {
            for (var lp = 0; lp < node.childNodes.length; lp++) {
                range = createRange(node.childNodes[lp], chars, range);

                if (chars.count === 0) {
                    break;
                }
            }
        }
    }

    return range;
};
function isChildOf(node, parentId) {
    while (node !== null) {
        if (node.id === parentId) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};
function setCurrentCursorPosition(chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        range = createRange(document.getElementById("code").parentNode, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};
function getCurrentCursorPosition(parentId) {
    var selection = window.getSelection(),
        charCount = -1,
        node;

    if (selection.focusNode) {
        if (isChildOf(selection.focusNode, parentId)) {
            node = selection.focusNode;
            charCount = selection.focusOffset;

            while (node) {
                if (node.id === parentId) {
                    break;
                }

                if (node.previousSibling) {
                    node = node.previousSibling;
                    charCount += node.textContent.length;
                } else {
                    node = node.parentNode;
                    if (node === null) {
                        break
                    }
                }
            }
        }
    }

    return charCount;
};

lexering();

