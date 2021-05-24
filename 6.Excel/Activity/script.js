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
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let allAlignBtn = document.querySelectorAll(".alignment-container>*");
let formulaInput = document.querySelector(".formula-box");
let sheetDB = workSheetDB[0];

// click event on Plus container 
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
    idx = allSheet[allSheet.length-1].getAttribute("idx");
    setLast(allSheet);

    // 2-D array
    initCurrentSheetDB();
    sheetDB = workSheetDB[idx];
    initUI();
    formulaInput.value = "" ;
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
    let sheetIdx = currentSheet.getAttribute("idx");
    console.log(sheetIdx);
    sheetDB = workSheetDB[sheetIdx];
    setUI(sheetDB);
    formulaInput.value = "" ;
}

// Put the address of cell in address bar when we click on any cell
for(let i=0;i<Allcells.length;i++)
{
    Allcells[i].addEventListener("click",function handleCell(){
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid+1;
        let colAdd = String.fromCharCode(cid+65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];

        if(cellObj.formula != "")
        {
            formulaInput.value = cellObj.formula;
        }
        else
        {
            formulaInput.value = "" ;
        }
        // Bold
        if(cellObj.bold==true)
        {
            boldBtn.classList.add("active-btn");
        }
        else 
        {
            boldBtn.classList.remove("active-btn");
        }
        // Italic 
        if(cellObj.italic=="normal")
        {
            italicBtn.classList.remove("active-btn");
        }
        else 
        {
            italicBtn.classList.add("active-btn");
        }
        // Underline
        if(cellObj.underline=="none")
        {
            underlineBtn.classList.remove("active-btn");
        }
        else 
        {
            underlineBtn.classList.add("active-btn");
        }

        // console.log(cellObj.halign);
        for(let i=0;i<allAlignBtn.length;i++)
        {
            allAlignBtn[i].classList.remove("active-btn");
        }
        
        if(cellObj.halign=="left")
        {
            leftBtn.classList.add("active-btn");
        }
        else if(cellObj.halign=="right")
        {
            console.log("left");
            rightBtn.classList.add("active-btn");
        }
        else if(cellObj.halign=="center")
        {
            centerBtn.classList.add("active-btn");
        }
        
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

    for(let i=0;i<allAlignBtn.length;i++)
    {
        allAlignBtn[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
    // Db update
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "left";
})

// Attaching event Listener on R button to make text on right side
rightBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";

    for(let i=0;i<allAlignBtn.length;i++)
    {
        allAlignBtn[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
    // Db update
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "right";
})

// Attaching event Listener on C button 
centerBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";

    for(let i=0;i<allAlignBtn.length;i++)
    {
        allAlignBtn[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    // Db update
    let cellObj = sheetDB[rid][cid];
    cellObj.halign = "center";
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

boldBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if(boldBtn.classList.contains("active-btn"))
    {
        boldBtn.classList.remove("active-btn");
        cell.style.fontWeight = "normal";
        cellObj.bold = false;
    }
    else
    {
        boldBtn.classList.add("active-btn");
        cell.style.fontWeight = "bold";
        cellObj.bold = true;
    }
})

italicBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if(italicBtn.classList.contains("active-btn"))
    {
        italicBtn.classList.remove("active-btn");
        cell.style.fontStyle  = "normal";
        cellObj.italic = "normal";
    }
    else
    {
        italicBtn.classList.add("active-btn");
        cell.style.fontStyle  = "italic";
        cellObj.italic = "italic";
    }
    
})

underlineBtn.addEventListener("click",function(){
    let address = addressBar.value;
    let {rid,cid} = getRidCid(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if(underlineBtn.classList.contains("active-btn"))
    {
        underlineBtn.classList.remove("active-btn");
        cell.style.textDecoration  = "none";
        cellObj.underline = "none";
    }
    else
    {
        underlineBtn.classList.add("active-btn");
        cell.style.textDecoration   = "underline";
        cellObj.underline = "underline";
    }
    
})

// ************************** Formula **************************

//  Blur Event 
//  value -> value
//  formula value -> manually value set
for(let i=0;i<Allcells.length;i++)
{
    Allcells[i].addEventListener("blur",function(){
        let address = addressBar.value;
        let {rid,cid} = getRidCid(address);
        let cellObj = sheetDB[rid][cid];

        // grid
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
        if(cellObj.value == cell.innerText){
            return;
        }
        if(cellObj.formula)
        {
            removeFormula(cellObj, address);
        }
        cellObj.value = cell.innerText;
        changeChildren(cellObj);
    })
}

//  Enter value in Formula Bar (value -> formula )
//  Old formula  -> new Formula
formulaInput.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formulaInput.value!="")
    {
        let newFormula = formulaInput.value;
        let address = addressBar.value;
        // get current cell
        let {rid,cid} = getRidCid(address);
        let cellObj = sheetDB[rid][cid];
        let prevFormula = cellObj.formula;
        if(prevFormula == newFormula)
        {
            return;
        }
        if(prevFormula != "" && prevFormula != newFormula)
        {
            removeFormula(cellObj, address);
        }
        let evaluatedValue = evaluateFormula(newFormula);
        setUIbyFormula(evaluatedValue,rid,cid);
        setFormula(evaluatedValue,newFormula,rid,cid,address);
        changeChildren(cellObj);
    }
})

function evaluateFormula(formula)
{
    let tokens = formula.split(" ");
    
    for(let i=0;i<tokens.length;i++)
    {
        let firstCharofToken = tokens[i].charCodeAt(0);
        if( firstCharofToken >=65  &&  firstCharofToken<=90)
        {
            let {rid,cid} = getRidCid(tokens[i]);
            let cellObj = sheetDB[rid][cid];
            let {value} = cellObj ;
            console.log(value);
            formula = formula.replace(tokens[i],value);
        }
    }
    // infix evaluation
    // console.log(formula);
    let ans = eval(formula);
    return ans;
    // console.log(ans);
    // eval
    // ( 10 + 20 )
}

function setUIbyFormula(value,rid,cid)
{
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
}

//   formula update in db, set evaluated value in DB and add children to its parent
function setFormula(value,formula,rid,cid,address)
{
    let cellObj = sheetDB[rid][cid];
    cellObj.value = value;
    cellObj.formula = formula;
    let formulaTokens = formula.split(" ");
    for(let i=0; i<formulaTokens.length;i++)
    {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if(firstCharOfToken >=65 && firstCharOfToken<=90)
        {
            let parentRidCid = getRidCid(formulaTokens[i]);
            // get value from db
            let cellObj = sheetDB[parentRidCid.rid][parentRidCid.cid];
            cellObj.children.push(address);
        }
    }
}

function changeChildren(cellObj)
{
    //  children get
    //  formula re-evaluate
    //  recursively call
    let childrens = cellObj.children;
    for(let i=0;i<childrens.length;i++)
    {
        let childAddress = childrens[i];
        let childRidCid = getRidCid(childAddress);
        let childObj = sheetDB[childRidCid.rid][childRidCid.cid];
        let formula = childObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIbyFormula(evaluatedValue,childRidCid.rid,childRidCid.cid);
        childObj.value = evaluatedValue;

        // call recursively
        changeChildren(childObj);
    }
}

//  remove urself from parent 
function removeFormula(cellObj, address)
{
    let formula = cellObj.formula;
    let formulaToken = formula.split(" ");
    
    for(let i=0;i<formulaToken.length;i++)
    {
        let firstCharOfToken = formulaToken[i].charCodeAt(0);
        if(firstCharOfToken>=65 && firstCharOfToken<=90)
        {
            let parentRidCid = getRidCid(formulaToken[i]);
            let parentObj = sheetDB[parentRidCid.rid][parentRidCid.cid];
            let childrens = parentObj.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx,1);
        }
    }
    cellObj.formula = "";
}
// Helper Function

function initUI(){
    for(let i=0;i<Allcells.length;i++)
    {
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "14px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}

function setUI(sheetDB){
    for(let i=0;i<sheetDB.length;i++)
    {
        for(let j=0;j<sheetDB[0].length;j++)
        {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let {bold,italic,underline,fontFamily,fontSize,halign,value} = sheetDB[i][j];
            cell.style.fontWeight = bold == true?"bold":"normal" ;
            cell.innerText = value;
           
        }
    }
}

function getRidCid(address)
{
    let colAddress = address.charCodeAt(0);
    let cid = Number(colAddress)-65;
    let rowAddress = address.slice(1);
    let rid = rowAddress-1;
    return { cid, rid } ;
}