// ---------------------------------------------------------------------------
// Week-number calculation
// ---------------------------------------------------------------------------

function parseISODate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

// Earliest selectable date — matches week 1's Monday (SEMESTER_START).
const MIN_DATE = parseISODate(SEMESTER_START);

function formatDateDMY(d) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}/${mm}/${d.getFullYear()}`;
}

function clampToMinDate(date) {
  return date < MIN_DATE ? new Date(MIN_DATE) : date;
}

function mondayOf(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun .. 6 = Sat
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function weekNumberForDate(date) {
  const start = mondayOf(parseISODate(SEMESTER_START));
  const target = mondayOf(date);
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.round((target - start) / msPerWeek) + 1;
}

function mondayForWeekNumber(n) {
  const start = mondayOf(parseISODate(SEMESTER_START));
  const d = new Date(start);
  d.setDate(d.getDate() + (n - 1) * 7);
  return d;
}

// Total weeks offered in the week dropdown (matches the semester length
// referenced throughout the schedule data, "1-15 седмица").
const WEEK_COUNT = 15;

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

const state = {
  mainGroup: localStorage.getItem("mainGroup") || "",
  englishGroup: localStorage.getItem("englishGroup") || "",
  week: weekNumberForDate(clampToMinDate(new Date())),
};

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function entryAppliesToSelection(entry) {
  if (entry.type === "english") {
    if (!state.englishGroup) return false;
    return entry.englishGroup === state.englishGroup;
  }
  if (entry.groups.includes("all")) return true;
  if (!state.mainGroup) return false;
  return entry.groups.includes(state.mainGroup);
}

function entryActiveInWeek(entry, week) {
  return week >= entry.weekStart && week <= entry.weekEnd;
}

const TYPE_LABELS = {
  lecture: "Лекция",
  exercise: "Упражнение",
  sport: "Спорт",
  english: "Английски език",
};

function renderEntryCard(entry) {
  const card = document.createElement("div");
  card.className = "entry";

  const isAll = entry.groups && entry.groups.includes("all");

  const metaParts = [
    isAll ? `${TYPE_LABELS[entry.type]} · <strong>всички групи</strong>` : TYPE_LABELS[entry.type],
    entry.room,
    entry.professor,
    entry.englishGroup ? `група ${entry.englishGroup}` : null,
    `седм. ${entry.weekStart}–${entry.weekEnd}`,
  ].filter(Boolean);

  card.innerHTML = `
    <div class="entry__time">${entry.start}–${entry.end}</div>
    <div class="entry__content">
      <div class="entry__subject">${entry.subject}</div>
      <div class="entry__meta">${metaParts.join(" · ")}</div>
      ${entry.note ? `<div class="entry__note">${entry.note}</div>` : ""}
    </div>
  `;
  return card;
}

const WEEKDAY_KEYS = { 1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri" };

function todayDayKey() {
  const now = new Date();
  if (weekNumberForDate(now) !== state.week) return null;
  return WEEKDAY_KEYS[now.getDay()] || null;
}

function render() {
  const container = document.getElementById("schedule");
  container.innerHTML = "";

  const hasSelection = state.mainGroup || state.englishGroup;
  if (!hasSelection) {
    container.innerHTML = '<p class="empty-hint">Избери група и/или група по английски, за да видиш часовете.</p>';
    return;
  }

  let anyEntry = false;
  const todayKey = todayDayKey();

  for (const day of DAYS) {
    const dayEntries = SCHEDULE
      .filter((e) => e.day === day)
      .filter((e) => entryActiveInWeek(e, state.week))
      .filter(entryAppliesToSelection)
      .sort((a, b) => a.start.localeCompare(b.start));

    if (dayEntries.length === 0) continue;
    anyEntry = true;

    const daySection = document.createElement("section");
    daySection.className = day === todayKey ? "day day--today" : "day";
    daySection.innerHTML = `<h2 class="day__title">${DAY_LABELS[day]}</h2>`;

    const list = document.createElement("div");
    list.className = "day__entries";
    for (const entry of dayEntries) {
      list.appendChild(renderEntryCard(entry));
    }
    daySection.appendChild(list);
    container.appendChild(daySection);
  }

  if (!anyEntry) {
    container.innerHTML = '<p class="empty-hint">Няма часове тази седмица за избраната група.</p>';
  }
}

// ---------------------------------------------------------------------------
// Controls setup
// ---------------------------------------------------------------------------

function setupControls() {
  const mainGroupSelect = document.getElementById("mainGroup");
  const englishGroupSelect = document.getElementById("englishGroup");
  const weekSelect = document.getElementById("weekSelect");
  const todayBtn = document.getElementById("todayBtn");
  const prevBtn = document.getElementById("prevWeekBtn");
  const nextBtn = document.getElementById("nextWeekBtn");

  for (const g of MAIN_GROUPS) {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    mainGroupSelect.appendChild(opt);
  }
  for (const g of ENGLISH_GROUPS) {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    englishGroupSelect.appendChild(opt);
  }

  for (let n = 1; n <= WEEK_COUNT; n++) {
    const monday = mondayForWeekNumber(n);
    const friday = new Date(monday.getTime() + 4 * 86400000);
    const opt = document.createElement("option");
    opt.value = n;
    opt.textContent = `Седмица ${n} (${formatDateDMY(monday)} – ${formatDateDMY(friday)})`;
    weekSelect.appendChild(opt);
  }

  mainGroupSelect.value = state.mainGroup;
  englishGroupSelect.value = state.englishGroup;
  weekSelect.value = state.week;

  mainGroupSelect.addEventListener("change", () => {
    state.mainGroup = mainGroupSelect.value;
    localStorage.setItem("mainGroup", state.mainGroup);
    render();
  });

  englishGroupSelect.addEventListener("change", () => {
    state.englishGroup = englishGroupSelect.value;
    localStorage.setItem("englishGroup", state.englishGroup);
    render();
  });

  function setWeek(n) {
    state.week = Math.min(WEEK_COUNT, Math.max(1, n));
    weekSelect.value = state.week;
    render();
  }

  weekSelect.addEventListener("change", () => {
    const n = parseInt(weekSelect.value, 10);
    if (!Number.isNaN(n)) setWeek(n);
  });

  todayBtn.addEventListener("click", () => {
    setWeek(weekNumberForDate(clampToMinDate(new Date())));
  });

  prevBtn.addEventListener("click", () => {
    setWeek(state.week - 1);
  });

  nextBtn.addEventListener("click", () => {
    setWeek(state.week + 1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupControls();
  render();
});
