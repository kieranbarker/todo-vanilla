import { getStorage, setStorage } from "./storage.js";
import {
  createForm,
  createPrompt,
  createList,
  createListItem,
  createClearButton,
} from "./elems.js";

//
// Variables
//

let data = getStorage();

const app = document.querySelector("#app");

const form = createForm();
const [input, submitButton] = form.elements;

const clearButton = createClearButton();
const prompt = createPrompt();
const list = createList();

//
// Functions
//

function render() {
  const listItems = data.map(createListItem);

  app.replaceChildren(form);

  if (listItems.length < 1) {
    app.append(prompt);
  } else {
    list.append(...listItems);
    renderList();
  }

  setStorage(data);
}

function renderList() {
  submitButton.after(clearButton);

  if (app.contains(prompt)) {
    prompt.replaceWith(list);
    return;
  }

  app.append(list);
}

function handleSubmit(event) {
  event.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  const toDo = { name: value, done: false };

  data.push(toDo);
  setStorage(data);

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
  setStorage(data);
}

function handleClick(event) {
  if (clearButton !== event.target) return;

  const message = "Are you sure you want to clear your to-do list?";
  const confirmClear = window.confirm(message);
  if (!confirmClear) return;

  clearButton.remove();

  data = [];
  setStorage(data);

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
