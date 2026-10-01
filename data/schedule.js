// ---------------------------------------------------------------------------
// CONFIG
// ---------------------------------------------------------------------------

// Monday of week 1 ("седмица 1") of the semester, as YYYY-MM-DD.
// PLACEHOLDER — tell Claude the real date and this gets corrected.
const SEMESTER_START = "2026-10-05";

const MAIN_GROUPS = ["1a", "1b", "2a", "2b", "3a"];
const ENGLISH_GROUPS = ["A", "B", "C", "D"];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const DAY_LABELS = {
  Mon: "Понеделник",
  Tue: "Вторник",
  Wed: "Сряда",
  Thu: "Четвъртък",
  Fri: "Петък",
};

// ---------------------------------------------------------------------------
// SCHEDULE ENTRIES
// ---------------------------------------------------------------------------
// type: "lecture" | "exercise" | "sport" | "english"
// groups: array of MAIN_GROUPS codes, or ["all"] for entries that apply to
//         every main group (whole-course lectures etc).
// englishGroup: only set for type "english" — one of ENGLISH_GROUPS.
// weekStart/weekEnd: inclusive week numbers this entry is active for.
//
// Entries tagged note:"VERIFY ..." are my best-effort reading of a merged /
// ambiguous cell in the screenshot — please double check these against the
// real timetable.
// ---------------------------------------------------------------------------

const SCHEDULE = [
  // ---------------- MONDAY ----------------
  { day: "Mon", start: "08:00", end: "09:30", subject: "ЛААГ (упражнения)", type: "exercise", groups: ["3a"], room: "232 с.з.", professor: "ас. Виктория Кунчева", weekStart: 1, weekEnd: 15 },
  { day: "Mon", start: "09:45", end: "11:15", subject: "ЛААГ (упражнения)", type: "exercise", groups: ["2a", "2b"], room: "232 с.з.", professor: "ас. Виктория Кунчева", weekStart: 1, weekEnd: 15 },
  { day: "Mon", start: "11:30", end: "13:00", subject: "ЛААГ (упражнения)", type: "exercise", groups: ["1a", "1b"], room: "232 с.з.", professor: "ас. Виктория Кунчева", weekStart: 1, weekEnd: 15 },

  { day: "Mon", start: "07:30", end: "09:00", subject: "Спорт", type: "sport", groups: ["2a", "2b"], room: "Нова зала", professor: "", weekStart: 1, weekEnd: 15 },

  { day: "Mon", start: "13:30", end: "16:45", subject: "Програмиране (лекция)", type: "lecture", groups: ["all"], room: "423 ауд.", professor: "проф. д-р Емил Хаджиколев", weekStart: 1, weekEnd: 7, note: "+1 ИИ" },

  { day: "Mon", start: "08:00", end: "11:15", subject: "ООП 1 (упражнения)", type: "exercise", groups: ["1a"], room: "433 к.з.", professor: "гл.ас. Й.Тодоров", weekStart: 8, weekEnd: 15 },
  { day: "Mon", start: "08:00", end: "11:15", subject: "ООП 1 (упражнения)", type: "exercise", groups: ["1b"], room: "434 к.з.", professor: "гл.ас. И.Димитров", weekStart: 8, weekEnd: 15 },
  { day: "Mon", start: "11:30", end: "15:00", subject: "ООП 1 (упражнения)", type: "exercise", groups: ["3a"], room: "434 к.з.", professor: "гл.ас. И.Димитров", weekStart: 8, weekEnd: 15 },

  { day: "Mon", start: "15:15", end: "17:45", subject: "Уеб програмиране 1 (упражнения)", type: "exercise", groups: ["3a"], room: "531 к.з.", professor: "ас. Николай Чочев", weekStart: 9, weekEnd: 15 },

  // ---------------- TUESDAY ----------------
  { day: "Tue", start: "07:30", end: "09:00", subject: "Спорт", type: "sport", groups: ["1a", "1b"], room: "Нова зала", professor: "", weekStart: 1, weekEnd: 15 },
  { day: "Tue", start: "09:00", end: "10:30", subject: "Спорт", type: "sport", groups: ["3a"], room: "Нова зала", professor: "", weekStart: 1, weekEnd: 15 },

  { day: "Tue", start: "10:30", end: "13:00", subject: "Уеб програмиране 1 (лекция)", type: "lecture", groups: ["all"], room: "446 к.з. (седм. 9-10) / 423 ауд. (седм. 11-15)", professor: "доц. д-р Хр. Христов", weekStart: 9, weekEnd: 15, note: "+1 ИИ; room changes mid-range — see room field" },

  { day: "Tue", start: "13:30", end: "15:00", subject: "Линейна алгебра и аналитична геометрия (лекция)", type: "lecture", groups: ["all"], room: "2 аула", professor: "доц. д-р М.Теофилова", weekStart: 1, weekEnd: 15, note: "+1 ИИ" },

  // ---------------- WEDNESDAY ----------------
  { day: "Wed", start: "08:00", end: "11:15", subject: "Програмиране (упражнения)", type: "exercise", groups: ["1a"], room: "531 к.з.", professor: "ас. Мария Горгорова", weekStart: 1, weekEnd: 7 },
  { day: "Wed", start: "08:00", end: "11:15", subject: "Програмиране (упражнения)", type: "exercise", groups: ["2a"], room: "534 к.з.", professor: "гл.ас. Костадин Йотов", weekStart: 1, weekEnd: 7 },
  { day: "Wed", start: "11:30", end: "15:00", subject: "Програмиране (упражнения)", type: "exercise", groups: ["1b"], room: "531 к.з.", professor: "ас. Мария Горгорова", weekStart: 1, weekEnd: 7 },
  { day: "Wed", start: "15:15", end: "18:30", subject: "Програмиране (упражнения)", type: "exercise", groups: ["3a"], room: "531 к.з.", professor: "ас. Мария Горгорова", weekStart: 1, weekEnd: 7 },
  { day: "Wed", start: "15:15", end: "18:30", subject: "Програмиране (упражнения)", type: "exercise", groups: ["2b"], room: "534 к.з.", professor: "гл.ас. Костадин Йотов", weekStart: 1, weekEnd: 7 },

  { day: "Wed", start: "08:00", end: "10:30", subject: "Уеб програмиране 1 (упражнения)", type: "exercise", groups: ["1a"], room: "533 к.з.", professor: "ас. Николай Чочев", weekStart: 9, weekEnd: 15 },
  { day: "Wed", start: "08:00", end: "10:30", subject: "Уеб програмиране 1 (упражнения)", type: "exercise", groups: ["2b"], room: "546 к.з.", professor: "доц.д-р Христов", weekStart: 9, weekEnd: 15 },
  { day: "Wed", start: "10:30", end: "13:00", subject: "Уеб програмиране 1 (упражнения)", type: "exercise", groups: ["2a"], room: "533 к.з.", professor: "ас. Николай Чочев", weekStart: 9, weekEnd: 15 },
  { day: "Wed", start: "10:30", end: "13:00", subject: "Уеб програмиране 1 (упражнения)", type: "exercise", groups: ["1b"], room: "546 к.з.", professor: "доц.д-р Христов", weekStart: 9, weekEnd: 15 },

  { day: "Wed", start: "11:30", end: "15:00", subject: "ООП 1 (упражнения)", type: "exercise", groups: ["2b"], room: "433 к.з.", professor: "гл.ас. Й.Тодоров", weekStart: 8, weekEnd: 15 },
  { day: "Wed", start: "15:15", end: "18:30", subject: "ООП 1 (упражнения)", type: "exercise", groups: ["2a"], room: "433 к.з.", professor: "гл.ас. Й.Тодоров", weekStart: 8, weekEnd: 15 },

  // ---------------- THURSDAY ----------------
  { day: "Thu", start: "08:45", end: "12:15", subject: "Обектно-ориентирано програмиране 1 (Java) (лекция)", type: "lecture", groups: ["all"], room: "423 ауд.", professor: "проф. д-р Станимир Стоянов", weekStart: 8, weekEnd: 15, note: "+1 ИИ" },

  // ---------------- FRIDAY ----------------
  { day: "Fri", start: "08:45", end: "13:00", subject: "Английски език", type: "english", englishGroup: "A", room: "246 к.з.", professor: "доц. Иван Шотлеков", weekStart: 1, weekEnd: 10, note: "+1 ИИ" },
  { day: "Fri", start: "08:45", end: "13:00", subject: "Английски език", type: "english", englishGroup: "D", room: "146 к.з.", professor: "хон. ас. Чемпиън-Лейн", weekStart: 1, weekEnd: 10, note: "+1 ИИ" },

  { day: "Fri", start: "13:30", end: "17:45", subject: "Английски език", type: "english", englishGroup: "B", room: "246 к.з.", professor: "доц. Ваня Иванова", weekStart: 1, weekEnd: 10, note: "+1 ИИ" },
  { day: "Fri", start: "13:30", end: "17:45", subject: "Английски език", type: "english", englishGroup: "C", room: "146 к.з.", professor: "ас. Деница Кацарска", weekStart: 1, weekEnd: 10, note: "+1 ИИ" },
];
