let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1]
let plusButton = bothElementsArr[0];
let body = document.body;
let deleteState = false;

for(let i=0;i<colorBtn.length;i++)
{
    colorBtn[i].addEventListener("click",function(e){
        let color = colorBtn[i].classList[1];
        mainContainer.style.backgroundColor = color;
    })
}




plusButton.addEventListener("click",createModal);
crossBtn.addEventListener("click",setDeleteState);

function createModal() {

    let modalContainer = document.querySelector(".modal_container");
    if(modalContainer==null)
    {
        modalContainer = document.createElement("div");
        modalContainer.setAttribute("class","modal_container");
        modalContainer.innerHTML = `<div class="input_container">
        <textarea class="modal_input" placeholder="Enter your text here"></textarea>
        </div>
        <div class="modal_filter_container">
            <div class="filter pink"></div>
            <div class="filter blue"></div>
            <div class="filter green"></div>
            <div class="filter black"></div>
        </div>`
        body.appendChild(modalContainer);
        handleModal(modalContainer);
    }
    let textarea = modalContainer.querySelector(".modal_input");
    textarea.value = "";

}

function handleModal(modal_container)
{
    let cColor = "black";
    let modalFilters = document.querySelectorAll(".modal_filter_container .filter");
    modalFilters[3].classList.add("border");
    for(let i=0; i<modalFilters.length;i++)
    {
        modalFilters[i].addEventListener("click",function(){
            // remove border from elements
            modalFilters.forEach((filter) => {
                filter.classList.remove("border");
            })
            //add

            modalFilters[i].classList.add("border");

            cColor = modalFilters[i].classList[1];
            console.log("current color of task",cColor);
        })
    }

    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keydown",function(e){
        if(e.key=="Enter" && textArea.value != "")
        {
            console.log("Task" , textArea.value);
            // remove modal
            modal_container.remove();
            // create taskbox
            createTask(cColor,textArea.value);
    
        }
    })

}

function createTask(color,task){
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class","task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#exampleId</h3>
        <div class="task_desc">${task}</div>
    </div>`;
    mainContainer.appendChild(taskContainer);

    let taskFilter = document.querySelector(".task_filter");
    taskFilter.addEventListener("click",changeColor);

    taskContainer.addEventListener("click", deleteTask);
}

function changeColor(e){
    // add event listener

    let taskFilter = e.currentTarget;
    let colors = ["pink" , "blue" , "green" , "black"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx+1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);
}

function setDeleteState(e){
    let crossBtn = e.currentTarget;
    if(deleteState==false)
    {
        crossBtn.classList.add("active");
    }
    else
    {
        crossBtn.classList.remove("active");
    }
    deleteState = !deleteState;
}

// function deleteTask(e){
//     let taskContainer = e.currentTarget;
//     if(deleteState){

//     }

// }