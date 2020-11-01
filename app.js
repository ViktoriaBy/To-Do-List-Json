// Elements
const refresh = document.querySelector(".refresh") 
const todaysDay = document.getElementById("todays-date")
const list = document.getElementById("list")
const input = document.getElementById("input")

//Class names
const CONFIRM = "fa-check-circle";
const UNCHECK = "fa-heart";
const STRIKE_OUT = "strikeOut";

//Variables
let LIST, id;

//Todays Date
const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
todaysDay.innerHTML = today.toLocaleDateString("en-US", options);


// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); 
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to UI
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear local storage
refresh.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


// add to do function
function addToDo(toDo, id, done, trash){
    
    if(trash){ return; }
    
    const DONE = done ? CONFIRM : UNCHECK;
    const LINE = done ? STRIKE_OUT : "";
    
    const items = `
                  <li class="items">
                        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="far fa-trash-alt de" job="delete" id =${id}></i>
                        </li>
                `;
    
    const position = "beforeend";
    
    list.insertAdjacentHTML(position, items);
}

// add item to list user the enter key
document.addEventListener("keyup",function(even){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        // if the input isn't empty
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            // add item to localstorage 
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});


// complete to do
function completeToDo(element){
    element.classList.toggle(CONFIRM);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(STRIKE_OUT);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

// target items created dynamically
list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value; 
    
    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    
    // add item localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
