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
allCells[0].click();  //default selected cell

firstSheet.addEventListener("click", handleActiveSheet);
addBtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let newSheet = document.createElement("div");
    newSheet.setAttribute("class", "sheet");
    newSheet.setAttribute("sheetIdx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 2}`;
    //page add
    sheetList.appendChild(newSheet);

    newSheet.addEventListener("click", handleActiveSheet)
})


function handleActiveSheet(e) {
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active_sheet");
    })

    if (!mySheet.classList[1]) {
        mySheet.classList.add("active_sheet");
    }
}


for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", function handleCells() {
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
    })
}


//align mbuttons
leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    cell.style.textAlign = "left";
})


centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    cell.style.textAlign = "center";
})


rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    cell.style.textAlign = "right";
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


fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    cell.style.fontSize = fontSize + "px";
})


fontFamily.addEventListener("change", function () {
    let family = fontFamily.value;
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = family;
})


boldBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontWeight = "bold";
})


italicBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontStyle = "italic";
})


underlineBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textDecoration = "underline";
})


textColor.addEventListener("change",function(){
    let colorValue = textColor.value; 
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.color = colorValue;
})


bgColor.addEventListener("change",function(){
    let colorValue = textColor.value; 
    let address = addressBar.value;
    let { rid, cid } = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.backgroundColor = colorValue;
})