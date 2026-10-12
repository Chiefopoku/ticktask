// Shared helpers for dates, priorities and sorting.

export const PRIORITIES = ["high", "medium", "low"];
const PRIORITY_RANK = { high: 0, medium: 1, low: 2 };

export const normalisePriority = (p) => {
  const v = String(p || "low").toLowerCase();
  return PRIORITY_RANK[v] === undefined ? "low" : v;
};

// "YYYY-MM-DD" for a Date in local time.
export const toDateInput = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// When a task is due, as a Date. No time means end of that day.
export const dueAt = (task) => {
  if (!task.dueDate) return null;
  const [y, m, d] = String(task.dueDate).slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return null;
  if (task.dueTime) {
    const [hh, mm] = task.dueTime.split(":").map(Number);
    return new Date(y, m - 1, d, hh || 0, mm || 0);
  }
  return new Date(y, m - 1, d, 23, 59, 59);
};

export const isOverdue = (task, now = new Date()) => {
  const due = dueAt(task);
  return !task.completed && !!due && due < now;
};

export const isDueToday = (task, now = new Date()) =>
  !!task.dueDate && String(task.dueDate).slice(0, 10) === toDateInput(now);

export const formatDue = (task, now = new Date()) => {
  const due = dueAt(task);
  if (!due) return null;
  const today = toDateInput(now);
  const tomorrow = toDateInput(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1));
  const day = String(task.dueDate).slice(0, 10);
  let label;
  if (day === today) label = "Today";
  else if (day === tomorrow) label = "Tomorrow";
  else {
    label = due.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: due.getFullYear() === now.getFullYear() ? undefined : "numeric",
    });
  }
  if (task.dueTime) {
    label += `, ${due.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
  }
  return label;
};

export const formatReminder = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
};

const createdMs = (t) => {
  const c = t.createdAt;
  if (!c) return 0;
  if (typeof c.toMillis === "function") return c.toMillis();
  const d = new Date(c);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
};

export const sortTasks = (tasks, sortBy) => {
  const list = [...tasks];
  const byDue = (a, b) => {
    const da = dueAt(a);
    const db = dueAt(b);
    if (da && db) return da - db;
    if (da) return -1;
    if (db) return 1;
    return createdMs(b) - createdMs(a);
  };
  list.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    if (sortBy === "priority") {
      const diff = PRIORITY_RANK[normalisePriority(a.priority)] - PRIORITY_RANK[normalisePriority(b.priority)];
      return diff || byDue(a, b);
    }
    if (sortBy === "newest") return createdMs(b) - createdMs(a);
    return byDue(a, b);
  });
  return list;
};

// Reminder offsets in minutes before the due time.
export const REMINDER_OPTIONS = [
  { value: "", label: "No reminder" },
  { value: "0", label: "At due time" },
  { value: "15", label: "15 min before" },
  { value: "60", label: "1 hour before" },
  { value: "1440", label: "1 day before" },
];
