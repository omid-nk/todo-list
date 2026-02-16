const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const remaining = document.getElementById("remaining");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateRemaining() {
  remaining.textContent = todos.filter((t) => !t.completed).length;
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const item = document.createElement("div");
    item.className = "todo-item";
    if (todo.completed) item.classList.add("completed");

    item.innerHTML = `
      <div class="todo-left">
        <input type="checkbox" ${todo.completed ? "checked" : ""}>
        <span class="todo-text">${todo.text}</span>
      </div>
      <button class="delete-btn">×</button>
    `;

    item.querySelector("input").addEventListener("change", () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    });

    item.querySelector(".delete-btn").addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    todoList.appendChild(item);
  });

  updateRemaining();
}

function addTodo() {
  const text = input.value.trim();
  if (!text) return;

  todos.unshift({
    id: Date.now(),
    text,
    completed: false,
  });

  input.value = "";
  saveTodos();
  renderTodos();
}

addBtn.addEventListener("click", addTodo);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTodo();
});

renderTodos();
