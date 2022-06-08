const storageKey = "todo-vanilla";

function getStorage() {
  const data = localStorage.getItem(storageKey);

  if (data) {
    return JSON.parse(data);
  }

  return [];
}

function setStorage(data) {
  localStorage.setItem(storageKey, JSON.stringify(data));
}

export { getStorage, setStorage };
