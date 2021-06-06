let addPlusBtn = document.querySelector(".fa-plus-circle");
let incomeContainer = document.querySelector(".income-container");
let expenseContainer = document.querySelector(".expense-container");
let descriptionInput = document.querySelector(".description-input");
let amountInput = document.querySelector(".input-number");
let income = document.querySelector(".income");
let expense = document.querySelector(".expense");
let crossBtn = document.querySelectorAll(".fa-times-circle");
let dropDownBox = document.querySelector(".drop-down-box");
let totalIncomeValBox = document.querySelector(".total-income-value");
let totalExpenseValBox = document.querySelector(".total-expense-value");
let moneyLeftValBox = document.querySelector(".money-left-value");

// function to get date,month and year (calender)
getDate();


// event listener to add income and expense modal in container
addPlusBtn.addEventListener("click",function(e){
    // if selected value is "+" then income modal created
    if(dropDownBox.value=="plus"){
        createIncomeModal();
        let childrenArr = incomeContainer.children;
        let totalIncomeVal = 0;
        for(let i=0;i<childrenArr.length;i++){
            let child = childrenArr[i];
            let incomeModal = child.children[2] ;
            // sum of all values of income modal
            totalIncomeVal += Number(incomeModal.innerText) ;
        }
        // set the total value in totalIncomeBox
        totalIncomeValBox.innerText = totalIncomeVal;
    }
    // if selected value is "-" then expense modal is created
    else{
        createExpenseModal();
        let childrenArr = expenseContainer.children;
        let totalExpenseVal = 0;
        for(let i=0;i<childrenArr.length;i++){
            let child = childrenArr[i];
            let expenseModal = child.children[2] ;
            totalExpenseVal += Number(expenseModal.innerText) ;
        }
        // set total expense value in expense box
        totalExpenseValBox.innerText = totalExpenseVal;
    }

    let moneyLeftVal = Number(totalIncomeValBox.innerText) - Number(totalExpenseValBox.innerText) ;
    moneyLeftValBox.innerText = moneyLeftVal ;
});

//  function to create income modal in Income container
function createIncomeModal(){
    let incomeContainerChildren = incomeContainer.children;
    if(incomeContainerChildren.length==0){
        let div = document.createElement("div");
        let {descVal,amountInputVal} = getDesc();
        div.setAttribute("class","income modal-1") ;
        div.innerHTML = `<div class="income-number">1.</div>
        <div class="description">${descVal}</div>
        <div class="amount">${amountInputVal}</div>
        <div class="cross-btn">
            <i class="fas fa-times-circle"></i>
        </div>` ;
        incomeContainer.appendChild(div);
    }
    else{
        let incomeContainerChildren = incomeContainer.children;
        let div = document.createElement("div");
        // console.log(incomeContainerChildren.length);
        let lastChild = incomeContainerChildren[incomeContainerChildren.length-1];
        let className = lastChild.getAttribute("class");
        // console.log(className);
        let incomeNumber = Number(className.split("-")[1])+1;
        // console.log(incomeNumber);
        let {descVal,amountInputVal} = getDesc();
        div.setAttribute("class",`income modal-${incomeNumber}`);
        div.innerHTML = `<div class="income-number">${incomeNumber}.</div>
        <div class="description">${descVal}</div>
        <div class="amount">${amountInputVal}</div>
        <div class="cross-btn">
            <i class="fas fa-times-circle"></i>     
        </div>` ;
        incomeContainer.appendChild(div);
    }
 
    // Adding event listener to cross btn in order to remove the modal container from Income container

    crossBtn = document.querySelectorAll(".fa-times-circle");
    for(let i=0;i<crossBtn.length;i++){
        
        if(!crossBtn[i].hasAttribute("value")){
            crossBtn[i].setAttribute("value","0");
            crossBtn[i].addEventListener("click",function(e){
                    let obj = e.currentTarget ;
                    let child = obj.parentNode;
                    let parent = child.parentNode;
                    // console.log(parent);
                    let previousChild = parent.children[2];
                    // console.log(previousChild);
                    previousChildVal = Number(previousChild.innerText);
                    // console.log(previousChildVal);
                    totalIncomeVal = Number(totalIncomeValBox.innerText);
                    let balance = totalIncomeVal - previousChildVal ;
                    totalIncomeValBox.innerText = balance;
                    let moneyLeftVal = Number(moneyLeftValBox.innerText);
                    moneyLeftValBox.innerText = moneyLeftVal - previousChildVal;
                    parent.remove();
                })
        }
        
    }

}

// crete expense modal in expense container
function createExpenseModal(){
    // total num of expense modal
    let expenseContainerChildren = expenseContainer.children;
    if(expenseContainerChildren.length==0){
        // create a div element
        let div = document.createElement("div");
        // get description value and input value 
        let {descVal,amountInputVal} = getDesc();
        // set class attribute
        div.setAttribute("class","expense modal-1") ;
        div.innerHTML = `<div class="expense-number">1.</div>
        <div class="description">${descVal}</div>
        <div class="amount">${amountInputVal}</div>
        <div class="cross-btn">
            <i class="fas fa-times-circle"></i>
        </div>` ;
        // Add expense modal in expense container
        expenseContainer.appendChild(div);
    }
    else{
        let expenseContainerChildren = expenseContainer.children;
        let div = document.createElement("div");
        let lastChild = expenseContainerChildren[expenseContainerChildren.length-1];
        let className = lastChild.getAttribute("class");
        let expenseNumber = Number(className.split("-")[1])+1;
        let {descVal,amountInputVal} = getDesc();
        div.setAttribute("class",`expense modal-${expenseNumber}`);
        div.innerHTML = `<div class="expense-number">${expenseNumber}.</div>
        <div class="description">${descVal}</div>
        <div class="amount">${amountInputVal}</div>
        <div class="cross-btn">
            <i class="fas fa-times-circle"></i>     
        </div>` ;
        expenseContainer.appendChild(div);

    }

    // Adding event listener to cross btn in order to remove the modal container from Expense container

    crossBtn = document.querySelectorAll(".fa-times-circle");
    for(let i=0;i<crossBtn.length;i++){
        
        if(!crossBtn[i].hasAttribute("value")){
            crossBtn[i].setAttribute("value","0");
            crossBtn[i].addEventListener("click",function(e){
                    let obj = e.currentTarget ;
                    let child = obj.parentNode;
                    let parent = child.parentNode;
                    // console.log(parent);
                    let previousChild = parent.children[2];
                    // console.log(previousChild);
                    previousChildVal = Number(previousChild.innerText);
                    
                    totalIncomeVal = Number(totalExpenseValBox.innerText);
                    let balance = totalIncomeVal - previousChildVal ;
                    totalExpenseValBox.innerText = balance;
                    let moneyLeftVal = Number(moneyLeftValBox.innerText);
                    moneyLeftValBox.innerText = moneyLeftVal + previousChildVal;
                    parent.remove();
                })
        }
        
    }

}
function getDesc(){
    if(descriptionInput.value != "" && amountInput.value!=""){
        let descVal = descriptionInput.value;
        let amountInputVal = amountInput.value;
        descriptionInput.value = "" ;
        amountInput.value = "" ;
        return {descVal,amountInputVal} ;
    }
    else{
        return;
    }
}


function getDate(){
    let d = new Date();
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    document.querySelector(".date").innerText = `${date} ${month},${year}` ;
}