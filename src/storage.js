// // src/storage.js

// const STORAGE_KEY = "visitedDays";

// export function markTodayVisited() {
//   const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//   const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
//   if (!stored.includes(today)) {
//     stored.push(today);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
//   }
// }

// export function getVisitedDays() {
//   return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
// }

// export function getDaysCount() {
//   return getVisitedDays().length;
// }

// export function clearVisitedDays() {
//   localStorage.removeItem(STORAGE_KEY);
// }

// // Дополнительно к visitedDays

// const MODULE_VISITS_KEY = "todayModuleVisits";

// // Получаем сегодняшнюю дату в формате YYYY-MM-DD
// function getToday() {
//   return new Date().toISOString().split("T")[0];
// }

// export function getTodayVisitedModules() {
//   const data = JSON.parse(localStorage.getItem(MODULE_VISITS_KEY) || "{}");
//   const today = getToday();
//   return data[today] || [];
// }

// export function markModuleVisitedToday(moduleId) {
//   const today = getToday();
//   const data = JSON.parse(localStorage.getItem(MODULE_VISITS_KEY) || "{}");

//   if (!data[today]) data[today] = [];
//   if (!data[today].includes(moduleId)) {
//     data[today].push(moduleId);
//     localStorage.setItem(MODULE_VISITS_KEY, JSON.stringify(data));
//   }
// }

const VISITED_DAYS_KEY = "visitedDays";
const MODULE_VISITS_KEY = "todayModuleVisits";

// ---------- helpers ----------

function getToday() {
  return new Date().toISOString().split("T")[0];
}

// ---------- основная логика ----------

export function markTodayVisited() {
  const today = getToday();
  const stored = JSON.parse(localStorage.getItem(VISITED_DAYS_KEY) || "[]");

  if (!stored.includes(today)) {
    stored.push(today);
    localStorage.setItem(VISITED_DAYS_KEY, JSON.stringify(stored));
  }
}

export function getVisitedDays() {
  return JSON.parse(localStorage.getItem(VISITED_DAYS_KEY) || "[]");
}

export function getDaysCount() {
  return getVisitedDays().length;
}

export function clearVisitedDays() {
  localStorage.removeItem(VISITED_DAYS_KEY);
  localStorage.removeItem(MODULE_VISITS_KEY);
}

// ---------- модули ----------

export function getTodayVisitedModules() {
  const data = JSON.parse(localStorage.getItem(MODULE_VISITS_KEY) || "{}");
  const today = getToday();
  return data[today] || [];
}

export function markModuleVisitedToday(moduleId) {
  const today = getToday();
  const data = JSON.parse(localStorage.getItem(MODULE_VISITS_KEY) || "{}");

  if (!data[today]) data[today] = [];
  if (!data[today].includes(moduleId)) {
    data[today].push(moduleId);
    localStorage.setItem(MODULE_VISITS_KEY, JSON.stringify(data));
  }
}

// =================================================
// =============== BACKUP / RESTORE =================
// =================================================

export function exportProgress() {
  return {
    visitedDays: localStorage.getItem(VISITED_DAYS_KEY),
    todayModuleVisits: localStorage.getItem(MODULE_VISITS_KEY),
  };
}

export function importProgress(data) {
  if (!data || typeof data !== "object") return;

  if (data.visitedDays) {
    localStorage.setItem(VISITED_DAYS_KEY, data.visitedDays);
  }

  if (data.todayModuleVisits) {
    localStorage.setItem(MODULE_VISITS_KEY, data.todayModuleVisits);
  }
}
