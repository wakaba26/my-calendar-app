// localStorage key
const STORAGE_KEY = "habitRecords_v1";

// データ読み込み
export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : {};
}

// データ保存
export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
