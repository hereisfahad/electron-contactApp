const taskList = document.querySelector(".collection");
const clearTasksBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
let tasks = JSON.parse(localStorage.getItem("tasks"));

//get tasks from LS update UI
document.addEventListener("DOMContentLoaded", getTasksAndUpdateUI);
//clear all tasks
clearTasksBtn.addEventListener("click", clearTasks);
// Remove task event
taskList.addEventListener("click", removeTask);
//handleform submit
document.querySelector("form").addEventListener("submit", handleSubmit);
// Filter tasks event
filter.addEventListener("keyup", filterTasks);

// Filter Tasks
function filterTasks(e) {
  // debugger;
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    // console.log(e.target.parentElement.parentElement.value); => 0
    // console.log(e.target.parentElement.parentElement.textContent); => task value
    let taskToRemove = e.target.parentElement.parentElement;
    taskToRemove.remove();
    // Remove from LS
    let tasks = getLocalStorage();
    tasks.forEach((task, index) => {
      if (taskToRemove.textContent === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function clearTasks() {
  //clear tasks form UI
  //   myNotification.show();
  confirm("Are you sure?")
    ? (localStorage.clear(), (taskList.innerHTML = ""))
    : "";

  /*// Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }*/

  //clear tasks from LS
}
function handleSubmit(e) {
  e.preventDefault();
  console.log("submit");
  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  if (!number || !name) return;
  let task = `${name} : ${number}`;
  if (task == "") return;
  addTaskToUI(task);
  addTaskToLS(task);
  document.getElementById("task").value = "";
}

function getTasksAndUpdateUI() {
  //  get tasks from local storage
  let tasks = getLocalStorage();

  tasks.forEach(task => {
    addTaskToUI(task);
  });
}

function getLocalStorage() {
  let tasks;
  tasks =
    localStorage.getItem("tasks") === null
      ? []
      : JSON.parse(localStorage.getItem("tasks"));
  return tasks;
}

function addTaskToLS(task) {
  let tasks = getLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToUI(task) {
  /*  create list item and append to list collection*/
  let li;
  //  creates an element "li"
  li = document.createElement("li");
  //  Add class
  li.className = "collection-item";
  // Create text node with last item in the tasks and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon html
  link.innerHTML = '<i class="fa fa-trash"></i>';
  // Append the link to li
  li.appendChild(link);
  // Append the link to li
  taskList.appendChild(li);
}
