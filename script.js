const taskInput = document.getElementById("task");
const addButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const deleteAllButton = document.getElementById("deleteAll");

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(addTaskToList);
}

function addTaskToList(taskText) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskText;

    const editButton = document.createElement("button");
    editButton.classList.add("editButton")
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
        taskInput.value = taskText; 
        taskInput.focus(); 
        addButton.textContent = "Edit"
        addButton.addEventListener("click",function(){
            taskList.removeChild(taskItem)
            addButton.textContent = "Add"


        })
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton")
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem);
        removeFromLocalStorage(taskText);
        addButton.textContent = "Add"

    });
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task !== taskText);
    saveTasks(updatedTasks);
}

addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText) {
        addTaskToList(taskText);
        saveTasks([...(JSON.parse(localStorage.getItem("tasks")) || []), taskText]);
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addButton.click();
    }
});

deleteAllButton.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
});

loadTasks();
