// To-Do App: vanilla JavaScript, tasks saved in localStorage.
const STORAGE_KEY = "oibsip-todo-tasks";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const formError = document.getElementById("form-error");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");
const pendingEmpty = document.getElementById("pending-empty");
const completedEmpty = document.getElementById("completed-empty");

let tasks = loadTasks();
let editingId = null;

// ---- Storage ----
function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (err) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    // Storage may be unavailable (private mode); the app still works for this session.
  }
}

// ---- Helpers ----
function formatTime(timestamp) {
  return new Date(timestamp).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// ---- Actions ----
function addTask() {
  const text = input.value.trim();
  if (text === "") {
    formError.textContent = "Type a task before adding it.";
    input.focus();
    return;
  }
  formError.textContent = "";
  tasks.unshift({ id: makeId(), text: text, completed: false, createdAt: Date.now(), completedAt: null });
  input.value = "";
  input.focus();
  saveAndRender();
}

function toggleTask(id) {
  const task = tasks.find(function (t) { return t.id === id; });
  if (!task) return;
  task.completed = !task.completed;
  task.completedAt = task.completed ? Date.now() : null;
  if (editingId === id) editingId = null;
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(function (t) { return t.id !== id; });
  if (editingId === id) editingId = null;
  saveAndRender();
}

function saveEdit(id, newText) {
  const text = newText.trim();
  if (text === "") return false;
  const task = tasks.find(function (t) { return t.id === id; });
  if (task) task.text = text;
  editingId = null;
  saveAndRender();
  return true;
}

function saveAndRender() {
  saveTasks();
  render();
}

// ---- Rendering ----
function buildTask(task) {
  const li = el("li", "task");

  const checkbox = el("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", task.completed ? "Mark as pending: " + task.text : "Mark as complete: " + task.text);
  checkbox.addEventListener("change", function () { toggleTask(task.id); });
  li.appendChild(checkbox);

  if (editingId === task.id) {
    const row = el("div", "edit-row");
    const editInput = el("input");
    editInput.type = "text";
    editInput.value = task.text;
    editInput.maxLength = 120;
    editInput.setAttribute("aria-label", "Edit task text");

    const saveBtn = el("button", "", "Save");
    saveBtn.type = "button";
    saveBtn.addEventListener("click", function () {
      if (!saveEdit(task.id, editInput.value)) editInput.focus();
    });

    const cancelBtn = el("button", "ghost", "Cancel");
    cancelBtn.type = "button";
    cancelBtn.addEventListener("click", function () { editingId = null; render(); });

    editInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { if (!saveEdit(task.id, editInput.value)) editInput.focus(); }
      if (e.key === "Escape") { editingId = null; render(); }
    });

    row.append(editInput, saveBtn, cancelBtn);
    li.appendChild(row);
    setTimeout(function () { editInput.focus(); editInput.select(); }, 0);
  } else {
    li.appendChild(el("span", "task-text", task.text));
  }

  let meta = "Added " + formatTime(task.createdAt);
  if (task.completed && task.completedAt) meta += " · Completed " + formatTime(task.completedAt);
  li.appendChild(el("span", "meta", meta));

  if (editingId !== task.id) {
    const actions = el("div", "actions");
    const editBtn = el("button", "ghost", "Edit");
    editBtn.type = "button";
    editBtn.addEventListener("click", function () { editingId = task.id; render(); });
    const delBtn = el("button", "danger", "Delete");
    delBtn.type = "button";
    delBtn.addEventListener("click", function () { deleteTask(task.id); });
    actions.append(editBtn, delBtn);
    li.appendChild(actions);
  }
  return li;
}

function render() {
  pendingList.replaceChildren();
  completedList.replaceChildren();
  let pending = 0;
  let completed = 0;

  tasks.forEach(function (task) {
    if (task.completed) { completed++; completedList.appendChild(buildTask(task)); }
    else { pending++; pendingList.appendChild(buildTask(task)); }
  });

  pendingCount.textContent = pending + " pending";
  completedCount.textContent = completed + " completed";
  pendingEmpty.hidden = pending > 0;
  completedEmpty.hidden = completed > 0;
}

// ---- Event listeners ----
addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", function (e) { if (e.key === "Enter") addTask(); });
input.addEventListener("input", function () { formError.textContent = ""; });

render();
