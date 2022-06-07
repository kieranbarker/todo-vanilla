function createList() {
  const list = document.createElement("ul");
  list.setAttribute("role", "list");
  return list;
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

function createClearButton() {
  const button = document.createElement("button");

  button.type = "button";
  button.textContent = "Clear list";
  button.dataset.action = "clear";

  return button;
}

export { createList, createListItem, createClearButton };
