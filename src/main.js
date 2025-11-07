// &&&&&&&&&&&&&&
// navbar
// &&&&&&&&&&&&&&

const html = document.querySelector("html");
const themeBtn = document.querySelector("#themeBtn");
const themeIcon = document.querySelector("#themeIcon");
const plusBtn = document.querySelector("#plusBtn");
const plusIcon = document.querySelector("#plusIcon");
const plusSection = document.querySelector("#plusSection");
const searchBtn = document.querySelector("#searchBtn");
const searchSection = document.querySelector("#searchSection");
const filterBtn = document.querySelector("#filterBtn");
const filterSection = document.querySelector("#filterSection");

const allSections = [plusSection, searchSection, filterSection];

// change theme
themeBtn.addEventListener("click", () => {
  html.classList.toggle("dark");
  themeIcon.setAttribute(
    "href",
    html.classList.contains("dark") ? "#sun" : "#moon",
  );
  let isDark = html.classList.contains("dark");
  if (isDark) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

document.addEventListener("DOMContentLoaded", findTheme);

function findTheme() {
  let currentTheme = localStorage.getItem("theme");
  if (!currentTheme) {
    currentTheme = "dark";
    localStorage.setItem("theme", "dark");
  }
  if (currentTheme === "dark") {
    html.classList.add("dark");
    themeIcon.setAttribute("href", "#sun");
  } else {
    html.classList.remove("dark");
    themeIcon.setAttribute("href", "#moon");
  }
}

// sections

function closeAllSections() {
  allSections.forEach(function (section) {
    section.classList.remove("show-section");
    plusIcon.setAttribute("href", "#plus");
  });
}

plusBtn.addEventListener("click", () => {
  const isOpen = plusSection.classList.contains("show-section");
  closeAllSections();
  if (!isOpen) {
    plusSection.classList.add("show-section");
    plusIcon.setAttribute("href", "#minus");
  }
});

searchBtn.addEventListener("click", () => {
  const isOpen = searchSection.classList.contains("show-section");
  closeAllSections();
  if (!isOpen) {
    searchSection.classList.add("show-section");
  }
});

filterBtn.addEventListener("click", () => {
  const isOpen = filterSection.classList.contains("show-section");
  closeAllSections();
  if (!isOpen) {
    filterSection.classList.add("show-section");
  }
});

// &&&&&&&&&&&&&&
// To Do List
// &&&&&&&&&&&&&&
const toDoList = document.querySelector("#toDoList");
const plusInput = document.querySelector("#plusInput");
const plusSubmit = document.querySelector("#plusSubmit");

const todos = [];

// input
plusSubmit.addEventListener("click", addTodo);

function addTodo() {
  const todoValue = plusInput.value.trim();
  if (!todoValue) return;

  const newTodo = {
    id: Date.now(),
    title: todoValue,
    isDone: false,
  };
  todos.push(newTodo);
  plusInput.value = "";
  closeAllSections();
  syncArrayWithLocalStorage();
  syncLocalStorageWithDOM();
}

function syncArrayWithLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function syncLocalStorageWithDOM() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));
  toDoList.innerHTML = "";
  localTodos.forEach(function (item) {
    toDoList.insertAdjacentHTML(
      "afterbegin",
      `<article
        data-id="${item.id}"
        class="bg-grey dark:bg-darker/80 text-dark my-2 flex items-center justify-between rounded-2xl border p-4 dark:text-white"
      >
        <div class="flex items-center gap-3">
          <svg class="h-8 w-8 cursor-pointer"><use href="#check"></use></svg>
          <h3 class="cursor-default">${item.title}</h3>
        </div>
        <svg class="trashBtn h-8 w-6 cursor-pointer"><use href="#trash"></use></svg>
      </article>`,
    );
  });
}

function syncLocalStorageWithArray() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));
  if (!localTodos) return;
  localTodos.forEach(function (item) {
    todos.push(item);
  });
  syncLocalStorageWithDOM();
}

window.addEventListener("DOMContentLoaded", syncLocalStorageWithArray);

// delete todo
toDoList.addEventListener("click", (e) => {
  const trash = e.target.closest(".trashBtn");
  if (trash) {
    const article = trash.closest("article");
    const todoId = +article.dataset.id;

    const index = todos.findIndex((todo) => todo.id === todoId);

    if (index !== -1) {
      todos.splice(index, 1);
      syncArrayWithLocalStorage();
      syncLocalStorageWithDOM();
    }
  }
});
