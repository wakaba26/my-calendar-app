import { loadData } from "./data.js";

export function getColor(count) {
  if (count === 0) return "#e5e7eb";   // グレー（未達成）
  if (count === 1) return "#bbf7d0";   // 薄い緑（ちょっと頑張った）
  if (count === 2) return "#4ade80";   // 緑（がんばった）
  return "#2dd4bf";                    // 青緑（MAX）
}

export function renderCalendar(year, month, onDayClick) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const data = loadData();

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  // 空白
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  // 日付セル
  for (let d = 1; d <= days; d++) {
    const key = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const habits = data[key] || {};
    const count = Object.values(habits).filter(v => v).length;
    const cell = document.createElement("div");

    cell.className = "day-cell";
    cell.style.background = getColor(count);

    const inner = document.createElement("div");
    inner.className = "day-inner";
    inner.textContent = d;
    
    cell.appendChild(inner);

    // タスク一覧を表示する要素
    const list = document.createElement("div");
    list.className = "task-list";
    
    // habits = { "筋トレ": true, "読書": false, ... }
    Object.entries(habits).forEach(([name, done]) => {
      if (done) {
        const item = document.createElement("div");
        item.className = "task-item";
        item.textContent = "• " + name;
        list.appendChild(item);
      }
    });
    cell.appendChild(list);

    cell.onclick = () => onDayClick(key);

    calendar.appendChild(cell);
  }
}
