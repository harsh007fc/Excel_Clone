let addBtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let fontBtn = document.querySelector(".font_size");
let fontFamily = document.querySelector(".font_family");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let textColor = document.querySelector("#color");
let bgColor = document.querySelector("#bg_color");
let allAlignmentBtns = document.querySelectorAll(".alignment_container>*");
let sheetDB = worksheetDB[0];
firstSheet.addEventListener("click", handleActiveSheet);


// create sheets
addBtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 1}`;
    //page add
    sheetList.appendChild(newSheet);

    // active sheet 
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    //to get present length after a mew sheet creation
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active_sheet");

    initCurrentSheetDb();
    sheetDB = worksheetDB[idx];
    // empty the cells  and set their props to default
    initUi();
    newSheet.addEventListener("click", handleActiveSheet)
})

// transfer active class on active class
function handleActiveSheet(e) {
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })

    if (!mySheet.classList[1]) {
        mySheet.classList.add("active_sheet");
    }
    let sheetIdx = mySheet.getAttribute("sheetIdx");
    sheetDB = worksheetDB[sheetIdx - 1];
    // initUi();
    setUi(sheetDB);
}

// set address on the click of the cell
for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", function handleCells() {
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];
        //styling set kro
        //object ki styling
        //fir ui styling
        //cell ki styling

        // for bold property bold
        if (cellObj.bold == true) {
            boldBtn.classList.add("active_btn");
        } else {
            boldBtn.classList.remove("active_btn");
        }

        //for italics property
        if (cellObj.italic == "italic") {
            italicBtn.classList.add("active_btn");
        } else {
            italicBtn.classList.remove("active_btn");
        }

        //for underline property
        if(cellObj.underline == "underline"){
            underlineBtn.classList.add("active_btn");
        }else{
            underlineBtn.classList.remove ("active_btn");
        }

        // loop to remove all alignmets of cell
        for (let i = 0; i < allAlignmentBtns.length; i++) {
            allAlignmentBtns[i].classList.remove("active_btn");
        }
        //for alignment
        if (cellObj.halign == "left") {//left active
            leftBtn.classList.add("active_btn");
        } else if (cellObj.halign == "right") {
            rightBtn.classList.add("active_btn");
        } else if (cellObj.halign == "center") {
            centerBtn.classList.add("active_btn");
        }

        // for fontfamily
        fontFamily.value = cellObj.fontFamily;

        // for fontSize
        fontBtn.value = cellObj.fontSize;

        //for textcolor
        textColor.value = cellObj.textColor;

        //for bgcolor
        bgColor.value = cellObj.bgColor;
    })
}

// to emulate starting click on (0,0) cell
allCells[0].click();  //default selected cell


//align mbuttons
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for(let i = 0; i < allAlignmentBtns.length; i++){
        allAlignmentBtns[i].classList.remove("active_btn");
    }
    leftBtn.classList.add("active_btn");
    let cellObj = sheetDB[rid][cid];  //sheetDb updated here
    cellObj.halign = "left";
})


centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for(let i = 0; i < allAlignmentBtns.length; i++){
        allAlignmentBtns[i].classList.remove("active_btn");
    }
    centerBtn.classList.add("active_btn");
    let cellObj = sheetDB[rid][cid];  //sheetDb updated here
    cellObj.halign = "center";
})


rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for(let i = 0; i < allAlignmentBtns.length; i++){
        allAlignmentBtns[i].classList.remove("active_btn");
    }
    rightBtn.classList.add("active_btn");
    let cellObj = sheetDB[rid][cid];  //sheetDb updated here
    cellObj.halign = "right";
})


//to get back rowid and colid
// its like reversing of oue task to converting of col no and row number into numbers
function getRidCid(address) {//A1
    let cellColAdr = address.charCodeAt(0);
    let cellRowAdr = address.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellRowAdr) - 1;
    return { rid, cid };

}

// font size change
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontSize = fontSize + "px";
    let cellObj = sheetDB[rid][cid];
    cellObj.fontSize = fontSize;
})

// fontfamily change
fontFamily.addEventListener("change", function () {
    let family = fontFamily.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = family;
    let cellObj = sheetDB[rid][cid];
    cellObj.fontFamily = family;
})

// to make a text bold in cell
boldBtn.addEventListener("click", function () {
    let isActive = boldBtn.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) { //bold the text
        cell.style.fontWeight = "bold";
        boldBtn.classList.add("active_btn");
        cellObj.bold = true;
    }
    else {  //make text normal
        cell.style.fontWeight = "normal";
        boldBtn.classList.remove("active_btn");
        cellObj.bold = false;
    }

})
// console.log(sheetDB);

// to make txt  italics in cell
italicBtn.addEventListener("click", function () {
    let isActive = italicBtn.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) {
        cell.style.fontStyle = "italic";
        italicBtn.classList.add("active_btn");
        cellObj.italic = "italic";
    }
    else {
        cell.style.fontStyle = "normal";
        italicBtn.classList.remove("active_btn");
        cellObj.italic = "normal";
    }

})


// to underline text in cell
underlineBtn.addEventListener("click", function () {
    let isActive = underlineBtn.classList.contains("active_btn");
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if (isActive == false) {
        cell.style.textDecoration = "underline";
        underlineBtn.classList.add("active_btn");
        cellObj.underline = "underline";
    }
    else {
        cell.style.textDecoration = "none";
        underlineBtn.classList.remove("active_btn");
        cellObj.underline = "none";
    }
})


// to change text color of txt in  a cell
textColor.addEventListener("change", function () {
    let colorValue = textColor.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = colorValue;
    let cellObj = sheetDB[rid][cid];
    cellObj.textColor = colorValue;
})

// to change bg color of cell clicked by us
bgColor.addEventListener("change", function () {
    let bgcolorValue = bgColor.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = bgcolorValue;
    let cellObj = sheetDB[rid][cid];
    cellObj.bgColor = bgcolorValue;
})



function initUi() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].innerHTML = "";
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16";
        allCells[i].style.textAlign = "left";
        allCells[i].style.backgroundColor = "#ffffff";
        allCells[i].style.color = "#000000";
        allCells[i].innerText = "";

    }
}


for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function handleCells() {
        let address = addressBar.value;
        let { rid, cid } = getRidCid(address);
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        let cellObj = sheetDB[rid][cid];
        cellObj.value = cell.innerText;

    })
}


function setUi(sheetDB){
    console.log(sheetDB);
    for(let i = 0; i < sheetDB.length; i++){
        for(let j = 0;  j < sheetDB[i].length; j++){
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {bold,italic,underline,fontFamily,fontSize,bgColor,textColor,halign,value} = sheetDB[i][j];
            cell.style.fontWeight = bold==true?"bold":"normal"; 
            cell.style.fontStyle= italic== true?"italic":"normal";
            cell.style.fontDecoration= underline== true?"underline":"none";
            cell.style.fontFamily = fontFamily;
            cell.style.fontSize = fontSize;
            cell.style.textAlign = halign;
            cell.style.color = textColor;
            cell.style.backgroundColor = bgColor;
            cell.innerText = value;
        }
    }
}