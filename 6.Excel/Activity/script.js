let iconContainer = document.querySelector(".icon-container");
let sheetList = document.querySelector(".sheet-list");

let firstSheet = document.querySelector(".sheet");
// Adding event listener on 1st sheet
firstSheet.addEventListener("click",handleClick);


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