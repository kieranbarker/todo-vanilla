import { getData, setData } from "./storage.js";
import { createListItem, createClearButton } from "./elems.js";

//
// Variables
//

let data = getData();

const form = document.querySelector("form");
const input = form.querySelector("input");

const list = document.querySelector("ul");

//
// Functions
//

function render() {
  const listItems = data.map(createListItem);

  if (listItems.length > 0) {
    const clearButton = createClearButton();
    list.append(...listItems);
    list.after(clearButton);
  }

  setData(data);
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
    const clearButton = createClearButton();
    list.after(clearButton);
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

  const prompt = "Are you sure you want to clear your to-do list?";
  const confirmClear = window.confirm(prompt);
  if (!confirmClear) return;

  data = [];
  setData(data);

  list.innerHTML = "";
  event.target.remove();
}

//
// Inits & Event Listeners
//

render();

form.addEventListener("submit", handleSubmit);
list.addEventListener("change", handleChange);
document.body.addEventListener("click", handleClick);
