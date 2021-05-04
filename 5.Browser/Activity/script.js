let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let bothElementsArr = document.querySelectorAll(".icon-container");
let crossBtn = bothElementsArr[1]
let plusButton = bothElementsArr[0];
let body = document.body;

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
            modal_container.remove();
    
        }
    })

}