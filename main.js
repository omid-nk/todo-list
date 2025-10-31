// -------------------- elements --------------------
const tasksElem = document.querySelector(".tasksElem");
const addTaskInput = document.querySelector(".addTaskInput");
const doneBtn = document.querySelector("#done");
const addTaskBtn = document.querySelector("#addTaskBtn");
const closeBtn = document.querySelector("#close");
const AddTaskBox = document.querySelector(".addTaskWrapper");

// -------------------- base tasks --------------------
const tasks = ["Add Your First task.."];
tasks.forEach(function (task) {
  let createElementArticle = document.createElement("article");
  createElementArticle.classList.add("task-box");
  createElementArticle.innerHTML = `
    <p class="task">${task}</p>
    <svg class="delTaskBtn remove-icon">
      <use href="#bag-cross"></use>
    </svg>
  `;
  tasksElem.append(createElementArticle);

  // add delete event for initial tasks
  createElementArticle
    .querySelector(".delTaskBtn")
    .addEventListener("click", delTask);
});

// -------------------- add task --------------------
doneBtn.addEventListener("click", addTask);

function addTask() {
  const valueInput = addTaskInput.value;
  if (valueInput.trim() === "") return;

  tasks.push(valueInput);

  let createElementArticle = document.createElement("article");
  createElementArticle.classList.add("task-box");
  createElementArticle.innerHTML = `
    <p class="task">${valueInput}</p>
    <svg class="delTaskBtn remove-icon">
      <use href="#bag-cross"></use>
    </svg>
  `;

  tasksElem.append(createElementArticle);

  // reset input and close modal
  addTaskInput.value = "";
  AddTaskBox.classList.remove("showAddTaskBox");

  // add delete event for new task
  createElementArticle
    .querySelector(".delTaskBtn")
    .addEventListener("click", delTask);
}

// -------------------- delete task --------------------
function delTask(event) {
  event.currentTarget.parentElement.remove();
}

// -------------------- open/close task box --------------------
addTaskBtn.addEventListener("click", showAddTaskBox);
closeBtn.addEventListener("click", showAddTaskBox);

function showAddTaskBox() {
  AddTaskBox.classList.toggle("showAddTaskBox");
}
