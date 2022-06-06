const storageKey = "todo-vanilla";

function getData() {
  const data = localStorage.getItem(storageKey);

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

function setData(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { getData, setData };
