let searchBtn = document.querySelector(".searchBtn");
let search = document.querySelector(".search");
let tasksHolder = document.querySelector(".tasksHolder");
let ask = document.querySelector(".ask");
let deleteBtn = document.querySelector(".delete");
let editBtn = document.querySelector(".edit");
let clearBtn = document.querySelector(".clearBtn");
let task = document.querySelector(".newTask");
let number;
let tasksArr = [];

//function to add tasks to the page
let addTasksToPage = function (){
    tasksArr.forEach(task=>{
        let newTask = document.createElement("div");
        newTask.setAttribute("data-id",task.id);
        newTask.className="newTask";
        newTask.appendChild(document.createTextNode(task.title));
        tasksHolder.appendChild(newTask);
    });
}

//get data from localStorage
let getTasksFromLocalStorage = function (){
    if(window.localStorage.getItem("tasks")){
    tasksArr= JSON.parse(window.localStorage.getItem("tasks"));
    addTasksToPage();
    }
}

getTasksFromLocalStorage();

//function to add tasks to local storage
let addTasksToLocalStorage = function () {
    window.localStorage.setItem("tasks",JSON.stringify(tasksArr));
}

//function to add tasks to tasksArray
let addTask = function (input){
    let task={
        id:Date.now(),
        title:input,
        completed:false,
    };
    tasksArr.push(task);
}

//function to open the task's edit section
let openEdit = function (target){
    let edit = document.createElement("textarea");
    console.log(target);
    number=target.getAttribute("data-id");
    edit.setAttribute("editing",1);
    edit.value=target.innerHTML;
    ask.appendChild(edit);  
    return edit;
}

//function to make the buttons accesiable from keyboard
search.addEventListener("keypress",function (event) {
    if(event.keyCode ==13)
        searchBtn.click();
});

searchBtn.onclick = function () {
    if(search.value==="")
        searchBtn.preventDefault();

    //add tasks to array
    addTask(search.value);
    search.value="";

    //add tasks to page
    tasksHolder.innerHTML="";
    addTasksToPage();

    //add tasks to local storage
    addTasksToLocalStorage();
}

let text;
document.addEventListener("click",function (e){
    if(e.target.classList.contains("newTask")){
        ask.classList.remove("disappear");
        text = openEdit(e.target);
        
    }
});

//function to submit the edit of the task
editBtn.onclick = function (){
    tasksArr.forEach(element => {
    if(element.id==number){
        element.title=text.value;
        text.remove();
        ask.classList.add("disappear");
        tasksHolder.innerHTML="";
        addTasksToPage();
        addTasksToLocalStorage();
    }
});
}

//function to delete the task
deleteBtn.onclick = function (){
    let count=0;
    tasksArr.forEach(element => {
        if(element.id==number){
            text.remove();
            ask.classList.add("disappear");
            tasksArr.splice(count,1)
            tasksHolder.innerHTML="";
            addTasksToPage();
            addTasksToLocalStorage();
        }
        count++;
    });
}

//function to clear all tasks
clearBtn.onclick = function (){
    tasksArr = [];
    tasksHolder.innerHTML="";
    window.localStorage.clear();
}