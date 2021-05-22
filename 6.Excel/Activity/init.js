let leftCol = document.querySelector(".left-col");
let str = "";
for(let i=0;i<100;i++)
{
    str += `<div class='left-col-box'>${i+1}</div>`;
}
leftCol.innerHTML = str;

let topRow = document.querySelector(".top-row");
str = "";
for(let i=0;i<26;i++)
{
    str += `<div class='col'>${String.fromCharCode(65+i)}</div>`;
}
topRow.innerHTML = str;

let grid = document.querySelector(".grid");
str = "";
for(let i=0;i<100;i++)
{
    str += `<div class='row'>` ;
    for(let j=0;j<26;j++)
    {
        str += `<div class='col' rid=${i} cid=${j} contenteditable="true"> </div>`;
    }
    str += "</div>" ;
}
grid.innerHTML = str;


let workSheetDB = [];
function initCurrentSheetDB(){
    let sheetDB = [];
    for(let i=0;i<100;i++)
    {
        let row = [];
        for(let j=0;j<26;j++)
        {
            let cell = {
                bold:"false",
                italic:"normal",
                underline:"none",
                fontFamily:"arial",
                fontSize:"10",
                halign:"left",
                value: "",
                formula: "",
                children: [],
            }
            row.push(cell);
        }
        sheetDB.push(row);
    }
    workSheetDB.push(sheetDB);
}

initCurrentSheetDB();