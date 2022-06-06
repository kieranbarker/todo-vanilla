import { getData, setData } from "./storage.js";

//
// Variables
//

const data = getData();

const form = document.querySelector("form");
const input = form.querySelector("input");

const list = document.querySelector("ul");

//
// Functions
//

function render() {
  const listItems = data.map(createListItem);
  list.append(...listItems);
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
}

function handleChange(event) {
  const { index } = event.target.dataset;
  data[index].done = event.target.checked;
  setData(data);
}

function createListItem(toDo, index) {
  const listItem = document.createElement("li");
  const input = document.createElement("input");
  const label = document.createElement("label");

  input.type = "checkbox";
  input.id = `todo-${index}`;
  input.dataset.index = index;
  input.defaultChecked = toDo.done;

  label.htmlFor = input.id;
  label.textContent = toDo.name;

  listItem.append(input, label);
  return listItem;
}

//
// Inits & Event Listeners
//

render();

form.addEventListener("submit", handleSubmit);
list.addEventListener("change", handleChange);
