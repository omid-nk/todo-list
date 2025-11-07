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
