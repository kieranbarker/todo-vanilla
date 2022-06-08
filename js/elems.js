const parser = new DOMParser();

function stringToHTML(str) {
  const doc = parser.parseFromString(str, "text/html");

  if (doc.body.childNodes.length === 1) {
    return doc.body.firstChild;
  }

  const fragment = document.createDocumentFragment();
  fragment.append(...doc.body.childNodes);

  return fragment;
}

function createForm() {
  const form = `
    <form>
      <p>
        <label for="to-do">What do you need to do?</label>
        <input id="to-do" type="text" required="">
      </p>
      <p>
        <button type="submit">Add to-do</button>
      </p>
    </form>
  `;

  return stringToHTML(form.trim());
}

function createPrompt() {
  const prompt = `
    <p>
      <em>Add some to-dos...</em>
    </p>
  `;

  return stringToHTML(prompt.trim());
}

function createList() {
  const list = "<ul role='list'></ul>";
  return stringToHTML(list);
}

function createListItem(toDo, index) {
  const id = `todo-${index}`;
  const checked = toDo.done ? "checked" : "";

  const listItem = `
    <li>
      <input type="checkbox" id="${id}" data-index="${index}" ${checked} />
      <label for="${id}">${toDo.name}</label>
    </li>
  `;

  return stringToHTML(listItem.trim());
}

function createClearButton() {
  const button = "<button type='button'>Clear list</button>";
  return stringToHTML(button);
}

export {
  createForm,
  createPrompt,
  createList,
  createListItem,
  createClearButton,
};
