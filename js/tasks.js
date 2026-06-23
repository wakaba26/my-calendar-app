// タスク一覧を読み込み
function loadTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}

// タスク一覧を保存
function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

let tasks = loadTasks();

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((t, i) => {
    const div = document.createElement("div");
    div.className = "habit-item";
    div.textContent = t;

    const del = document.createElement("button");
    del.textContent = "削除";
    del.onclick = () => {
      tasks.splice(i, 1);
      saveTasks(tasks);
      renderTasks();
    };

    div.appendChild(del);
    list.appendChild(div);
  });
}

document.getElementById("addTaskBtn").onclick = () => {
  const input = document.getElementById("taskInput");
  const name = input.value.trim();
  if (!name) return;

  tasks.push(name);
  saveTasks(tasks);
  input.value = "";
  renderTasks();
};

renderTasks();
