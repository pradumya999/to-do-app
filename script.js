// let Todos = [];
let Todos = JSON.parse(localStorage.getItem("My-Todos")) || [];
RenderTodos();

function AddTodo(){
    const inputEl = document.querySelector("#newTask-Input");
    if(inputEl.value === "") alert("Enter a task!"); 
    else Todos.push({task: inputEl.value, status: false});
    inputEl.value = "";
    localStorage.setItem("My-Todos", JSON.stringify(Todos));
    RenderTodos();
}

function RenderTodos(){
    const mainDiv = document.querySelector(".todos");
    mainDiv.innerHTML = "";

    for(i = 0; i < Todos.length; i++){
        mainDiv.appendChild(CreateElement(i));
    }
}

function CreateElement(index){
    const topDiv = document.createElement("div");
    topDiv.setAttribute("id", "topDiv-"+index);
    topDiv.setAttribute("style", "display: flex; justify-content: space-between;");

    //Task
    const taskDiv = document.createElement("div");
    taskDiv.setAttribute("id", "todo-"+index);
    const task = document.createElement("h4");
    task.setAttribute("style", "margin: 0px;")
    task.textContent = Todos[index].task;
    taskDiv.appendChild(task);

    //Options for task
    const optionDiv = document.createElement("div");
    optionDiv.setAttribute("style", "display: flex;")

    //Complete task
    const checkSpan = document.createElement("span");
    checkSpan.setAttribute("style", "padding-right: 10px")
    const checkButton = document.createElement("h4");
    checkButton.setAttribute("id", "check-"+index);
    if(!Todos[index].status) checkButton.textContent = "☐";
    else checkButton.textContent = "☑";
    checkButton.setAttribute("style", "margin: 0px; cursor: pointer; padding-bottom: 3px;");
    checkButton.addEventListener('click', () => CompleteTask(index));
    checkSpan.appendChild(checkButton);
    optionDiv.appendChild(checkSpan);

    //Edit task
    const editSpan = document.createElement("span");
    editSpan.setAttribute("style", "padding-right: 10px")
    const editButton = document.createElement("h4");
    editButton.setAttribute("id", "edit-"+index);
    editButton.textContent = "✎";
    editButton.setAttribute("style", "margin: 0px; cursor: pointer;");
    editButton.addEventListener('click', () => editTask(index));
    editSpan.appendChild(editButton);
    optionDiv.appendChild(editSpan);

    //Delete task
    const deleteSpan = document.createElement("span");
    const deleteButton = document.createElement("h4");
    deleteButton.setAttribute("id", "delete-"+index);
    deleteButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
    deleteButton.setAttribute("style", "margin: 0px; padding-top: 8px; cursor: pointer; font-size: 18px;");
    deleteButton.addEventListener('click', () => deleteTask(index));
    deleteSpan.appendChild(deleteButton);
    optionDiv.appendChild(deleteSpan);

    topDiv.appendChild(taskDiv);
    topDiv.appendChild(optionDiv);
    return topDiv;
}

function CompleteTask(index){
    const state = document.querySelector("#check-"+index).textContent;
    if(state === "☐"){
    // if(Todos[index].status == false){
        document.querySelector("#todo-"+index).setAttribute("style", "text-decoration: line-through;");
        document.querySelector("#check-"+index).textContent = "☑";
        Todos[index].status = true;
    } else {
        document.querySelector("#todo-"+index).setAttribute("style", "text-decoration:;");
        document.querySelector("#check-"+index).textContent = "☐";
        Todos[index].status = false;
    }
}

function editTask(index){
    let flag = false;
    const editInputEl = document.createElement("input");
    editInputEl.setAttribute("id", "editbox-"+index);

    editInputEl.addEventListener("keydown",(event)=>{
        if(event.key === "Enter"){
            flag = true;
            const editedTask = document.createElement("h4");
            editedTask.setAttribute("style", "margin: 0px;");
            editedTask.textContent = editInputEl.value;
            document.querySelector("#editbox-"+index).remove();
            taskEl.appendChild(editedTask);
            Todos[index].task = editedTask.textContent;
            localStorage.setItem("My-Todos", JSON.stringify(Todos));
            document.querySelector("#todo-"+index).setAttribute("style", "text-decoration:;");
            document.querySelector("#check-"+index).textContent = "☐"
        }
    });

    editInputEl.addEventListener("blur", ()=>{
        if(flag == true) return;

        const editedTask = document.createElement("h4");
        editedTask.setAttribute("style", "margin: 0px;")
        editedTask.textContent = editInputEl.placeholder;
        editInputEl.remove();
        taskEl.appendChild(editedTask);
    });
    
    const taskEl = document.querySelector("#todo-"+index);
    editInputEl.value = taskEl.children[0].textContent;
    editInputEl.setAttribute("placeholder", editInputEl.value);
    taskEl.children[0].remove();
    editInputEl.setAttribute("style", "border: 1px solid rgba(0, 0, 0, 0.500);border-radius: 3px; padding: 5px 0px 5px 10px;margin-top: 3px;");
    taskEl.appendChild(editInputEl);
    editInputEl.focus();
    editInputEl.select();
}

function deleteTask(index){
    Todos.splice(index, 1);
    localStorage.setItem("My-Todos", JSON.stringify(Todos));
    RenderTodos();
}

const buttonEl = document.querySelector("#addTodo-Button");
buttonEl.addEventListener('click', AddTodo);

const inputEl = document.querySelector("#newTask-Input");
inputEl.addEventListener('keydown', (event)=>{
    if(event.key === "Enter") AddTodo();
});