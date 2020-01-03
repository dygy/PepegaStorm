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
// TODO:: Rewrite FULLY
function lexering() {
    // group one - comments |gray  |
    // group two - keywords |orange|
    // group three - funcs  |yellow|
    // group four - props   |purple|
    // parse str and regex  |green |
    const exps=[];
    let code = input.innerHTML;
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
function store(index, lastIndex, value, string, type) {
    //TODO: Store info

    let left = string.substr(0,index);
    const middle = value;
    let right
    if (type === "functio"){
        right = string.substr(lastIndex, string.length);
        return left+" "+middle+" "+right;
    }
    else if (type==="propper"){
        left = string.substr(0,index+1);
        right = string.substr(lastIndex + 1, string.length);
        return left+""+middle+" "+right;
    }

    else {
        right = string.substr(lastIndex + 1, string.length);
        return left+""+middle+" "+right;
    }
    console.log(left+" !!!"+right);
}
function concater() {
    //TODO: create HTML Text;
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

