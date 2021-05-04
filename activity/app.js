let addBtnContainer = document.querySelector(".add_sheet_container");
let sheetList = document.querySelector(".sheet_list");

let firstSheet = document.querySelector(".sheet");


let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");

firstSheet.addEventListener("click",handleActiveSheet);
addBtnContainer.addEventListener("click",function(){
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);

    let newSheet = document.createElement("div");
    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("sheetIdx",idx+1);
    newSheet.innerText = `Sheet ${idx + 2}`;
    //page add
    sheetList.appendChild(newSheet);

    newSheet.addEventListener("click",handleActiveSheet)
})

function handleActiveSheet(e){
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function(sheet){
        sheet.classList.remove("active_sheet");
    })

    if(!mySheet.classList[1])
    {
        mySheet.classList.add("active_sheet");
    }
}

for(let i = 0; i < allCells.length; i++)
{
    allCells[i].addEventListener("click",function handleCells(){
       let rid =  Number(allCells[i].getAttribute("rid"));
       let cid = Number(allCells[i].getAttribute("cid"));
       let rowAdd = rid + 1;
       let colAdd = String.fromCharCode(cid + 65);
       let address = colAdd + rowAdd;
       addressBar.value = address;
    })
}

//budefault select
allCells[0].click();
