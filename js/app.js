import { loadData, saveData } from "./data.js";
import { renderCalendar } from "./calendar.js";

let current = new Date();
// let habits = []; // 習慣リスト

// 初期化
window.onload = () => {
  setupUI();
  render();
};

function setupUI() {
  // document.getElementById("addHabitBtn").onclick = addHabit;
  document.getElementById("prevMonth").onclick = () => changeMonth(-1);
  document.getElementById("nextMonth").onclick = () => changeMonth(1);
}

document.getElementById("modalClose").onclick = () => {
  document.getElementById("modal").classList.add("hidden");
};

document.getElementById("resetCalendar").onclick = () => {
  saveData({});
  render();
};

function render() {
  const y = current.getFullYear();
  const m = current.getMonth();

  document.getElementById("currentMonth").textContent = `${y}年 ${m+1}月`;

  renderCalendar(y, m, openDayModal);
  // renderHabitList();
}

function changeMonth(diff) {
  current.setMonth(current.getMonth() + diff);
  render();
}

// function addHabit() {
//   const input = document.getElementById("habitInput");
//   const name = input.value.trim();
//   if (!name) return;

//   habits.push(name);
//   input.value = "";
//   renderHabitList();
// }

// function renderHabitList() {
//   const list = document.getElementById("habitList");
//   list.innerHTML = "";

//   habits.forEach((h, i) => {
//     const div = document.createElement("div");
//     div.className = "habit-item";
//     div.textContent = h;

//     const del = document.createElement("button");
//     del.textContent = "削除";
//     del.onclick = () => {
//       habits.splice(i, 1);
//       renderHabitList();
//     };

//     div.appendChild(del);
//     list.appendChild(div);
//   });
// }

let selectedDate = null;

// function openDayModal(dateKey) {
//   selectedDate = dateKey;

//   const data = loadData();
//   const todayHabits = data[dateKey] || {};

//   document.getElementById("modalDate").textContent = dateKey;

//   // const list = document.getElementById("modalHabitList");
//   // list.innerHTML = "";

//   // habits.forEach(h => {
//   //   const checked = todayHabits[h] ? "checked" : "";
//   //   list.innerHTML += `
//   //     <label>
//   //       <input type="checkbox" data-habit="${h}" ${checked}>
//   //       ${h}
//   //     </label><br>
//   //   `;
//   // });

//   document.getElementById("modal").classList.remove("hidden");
// }

function openDayModal(dateKey) {
  selectedDate = dateKey;

  const data = loadData();
  const todayHabits = data[dateKey] || {};

  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  const list = document.getElementById("modalHabitList");
  list.innerHTML = "";

  tasks.forEach(t => {
    const checked = todayHabits[t] ? "checked" : "";
    list.innerHTML += `
      <label>
        <input type="checkbox" data-habit="${t}" ${checked}>
        ${t}
      </label><br>
    `;
  });

  document.getElementById("modalDate").textContent = dateKey;
  document.getElementById("modal").classList.remove("hidden");
}


document.getElementById("modalSave").onclick = () => {
  const data = loadData();
  const habits = {};

  document.querySelectorAll("#modalHabitList input[type='checkbox']").forEach(cb => {
    habits[cb.dataset.habit] = cb.checked;
  });

  data[selectedDate] = habits;
  saveData(data);

  document.getElementById("modal").classList.add("hidden");
  render();
};

document.getElementById("modalResetDay").onclick = () => {

  const data = loadData();
  delete data[selectedDate];   // ← この日だけ削除
  saveData(data);

  document.getElementById("modal").classList.add("hidden");
  render();
};
