let iconContainer = document.querySelector(".icon-container");
let sheetList = document.querySelector(".sheet-list");

let firstSheet = document.querySelector(".sheet");
// Adding event listener on 1st sheet
firstSheet.addEventListener("click",handleClick);
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let fontBtn = document.querySelector(".font-size");
let fontFamilyBtn = document.querySelector(".font-family");

iconContainer.addEventListener("click", function(){
    let allSheet = document.querySelectorAll(".sheet");
    let lastSheet = allSheet[allSheet.length-1];
    let idx = lastSheet.getAttribute("idx");
    // Create new Sheet
    let newSheet = document.createElement("div");
    //  Set class Attribute
    newSheet.setAttribute("class","sheet");
    //  Set index Attribute
    newSheet.setAttribute("idx",Number(idx)+1);
    // set innner text in new Sheet
    newSheet.innerText = `Sheet-${Number(idx)+2}`;
    //  append in parent list
    sheetList.appendChild(newSheet);
    allSheet = document.querySelectorAll(".sheet");
    setLast(allSheet);
    // adding event listener on last sheet
    newSheet.addEventListener("click",handleClick);
})

// set active class on last sheet as default when added
function setLast(allSheet)
{
    for(let i=0;i<allSheet.length;i++)
    {
        allSheet[i].classList.remove("active");
    }
    allSheet[allSheet.length-1].classList.add("active");
}

// click handle function to set active class 
function handleClick(e)
{
    let currentSheet = e.currentTarget;
    let allSheet = document.querySelectorAll(".sheet");
    for(let i=0;i<allSheet.length;i++)
    {
        allSheet[i].classList.remove("active");
    }
    if(!currentSheet.classList[1])
    {
        currentSheet.classList.add("active");
    }
}

// Put the address cell in address bar when we click on any cell
for(let i=0;i<Allcells.length;i++)
{
    Allcells[i].addEventListener("click",function handleCell(){
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid+1;
        let colAdd = String.fromCharCode(cid+65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
    })
}
// If we dont click on any cell then by default 0th cell address will be stored in address bar
Allcells[0].click();

// Attaching event listener on L button to make text on left side
leftBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
})

// Attaching event Listener on R button to make text on right side
rightBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
})

// Attaching event Listener on C button 
centerBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
})

fontBtn.addEventListener("change",function(){
    let address = addressBar.value;
    let fontSizeVal = fontBtn.value;
    let {rid,cid} = getRidCid(address);
    // console.log(rid,cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSizeVal);
    cell.style.fontSize = fontSizeVal + "px";
})

fontFamilyBtn.addEventListener("change",function(){
    let address = addressBar.value;
    let fontFamily = fontFamilyBtn.value;
    let {rid,cid} = getRidCid(address);
    // console.log(rid,cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily = fontFamily;
})

// Helper Function
function getRidCid(address)
{
    let colAddress = address.charCodeAt(0);
    let cid = Number(colAddress)-65;
    let rowAddress = address.slice(1);
    let rid = rowAddress-1;
    return { cid, rid } ;
}