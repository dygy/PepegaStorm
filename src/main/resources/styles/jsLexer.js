const keywords = [
    "var","let","function","async",
    "await","const","if","else","switch","case","break", "yield",
    "do", "while", "for"
]
let range = document.createRange();
const sel = window.getSelection();
range.setStart(input.childNodes[2], 5);
range.collapse(true);
sel.removeAllRanges();
sel.addRange(range);

// TODO:: Rewrite FULLY
function lexering() {
    let content = input.innerText;
    input.innerHTML="";
    input.innerText = content;
    let word ="";
    for (let x=0 ;x<input.innerText.length;x++ ){
        if (input.innerText[x]!==";" && input.innerText[x]!==" " && input.innerText[x]!=="\n"&&input.innerText[x]!=="." && (x+1<input.innerText.length) ){
            word +=input.innerText[x]
        }
        else  {
           // console.log(word);
            if(word!==""||word!==" "||word==="\n"){
                for (let y = 0;y<keywords.length ;y++) {
                    if (word === keywords[y]) {
                       // console.log("got " + word);
                        input.innerHTML = input.innerHTML.replace(word, `<text class="keyword">${word}</text>`)
                    }
                }
                if (checkIfString(word)) {
                    input.innerHTML = input.innerHTML.replace(word, `<text class="string">${word}</text>`)
                } else {
                    if (word !== "") {
                     //   console.log("didn't get " + word);
                    }
                }

            }
            word=''
        }
    }

}
function checkIfString(str){
    str.replace(" ","")
    console.log(str[0]+""+str[str.length-1]);
    return str[0] + str[str.length - 1] === '""' || str[0] + str[str.length - 1] === "''" || str[0] + str[str.length - 1] === '``';

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