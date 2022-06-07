import { getData, setData } from "./storage.js";
import { createList, createListItem, createClearButton } from "./elems.js";

//
// Variables
//

let data = getData();

const form = document.querySelector("form");
const input = form.querySelector("input");
const submitButton = form.querySelector("[type='submit']");

const prompt = document.querySelector("#prompt");

const list = createList();
const clearButton = createClearButton();

//
// Functions
//

function render() {
  const listItems = data.map(createListItem);

  if (listItems.length > 0) {
    list.append(...listItems);
    renderList();
  }

  setData(data);
}

function renderList() {
  submitButton.after(clearButton);
  prompt.replaceWith(list);
}

function handleSubmit(event) {
  event.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  const toDo = { name: value, done: false };

  data.push(toDo);
  setData(data);

  const listItem = createListItem(toDo, data.length - 1);
  list.append(listItem);

  input.value = "";

  if (data.length === 1) {
    renderList();
  }
}

function handleChange(event) {
  const { index } = event.target.dataset;
  data[index].done = event.target.checked;
  setData(data);
}

function handleClick(event) {
  const { action } = event.target.dataset;
  if (action !== "clear") return;

  const message = "Are you sure you want to clear your to-do list?";
  const confirmClear = window.confirm(message);
  if (!confirmClear) return;

  data = [];
  setData(data);

  event.target.remove();

  list.innerHTML = "";
  list.replaceWith(prompt);
}

//
// Inits & Event Listeners
//

render();

form.addEventListener("click", handleClick);
form.addEventListener("submit", handleSubmit);
list.addEventListener("change", handleChange);
