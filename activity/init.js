let topRow = document.querySelector(".top_row");
let strng = "";
for (let i = 0; i < 26; i++) {
    strng += `<div class="col">${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = strng;

let leftCol = document.querySelector(".left_col");
let str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="left_col_box">${i + 1}</div>`;
}
leftCol.innerHTML = str;

let grid = document.querySelector(".grid")
let string = "";
for (let i = 0; i < 100; i++) {
    string += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        string += `<div class="col" rid=${i} cid=${j} contenteditable="true"></div>`;
    }
    string += "</div>";
}
grid.innerHTML = string;

// sheet database started here
let sheetDB = [];
for(let i = 0; i < 100; i++){
    let row = [];
    for(let j = 0; j < 26; j++)
    { ///this represent initial state of ui
        let cell = {
            bold:false,
            italic:"normal",
            underline:"none",
            fontFamily:"Arial",
            fontSize:"10",
            halign:"left"
        };
        row.push(cell);
        // formatting
    }
    sheetDB.push(row);
}
// console.log(sheetDB); //just to see it
