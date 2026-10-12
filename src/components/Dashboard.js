import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { SearchIcon, BellIcon, AlertIcon, CalendarIcon, ListIcon, CheckIcon, UserIcon } from "./Icons";
import { sortTasks, isOverdue, isDueToday, normalisePriority } from "./taskUtils";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
  { key: "overdue", label: "Overdue" },
];

const EMPTY_TEXT = {
  all: "No tasks yet. Add your first one above.",
  active: "Nothing left to do. Nice work!",
  completed: "No completed tasks yet.",
  overdue: "Nothing overdue. You're on track.",
};

// Reminders are shown while the app is open; look this far ahead when scheduling them.
const REMINDER_WINDOW_MS = 24 * 60 * 60 * 1000;

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("due");
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(() => new Date());
  const [permission, setPermission] = useState(
    typeof window !== "undefined" && "Notification" in window ? Notification.permission : "unsupported"
  );

  // Live task updates from Firestore.
  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        setTasks(snap.docs.map((d) => ({ ...d.data(), id: d.id })));
        setLoading(false);
      },
      () => {
        setError("We couldn't load your tasks. Check your connection and refresh.");
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user.uid]);

  // Keep "today" and "overdue" accurate while the page stays open.
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  // Schedule browser notifications for upcoming reminders.
  useEffect(() => {
    if (permission !== "granted") return undefined;
    const timers = [];
    const nowMs = Date.now();
    tasks.forEach((task) => {
      if (task.completed || !task.reminder) return;
      const at = new Date(task.reminder).getTime();
      const wait = at - nowMs;
      if (wait > 0 && wait <= REMINDER_WINDOW_MS) {
        timers.push(
          setTimeout(() => {
            try {
              new Notification(`Reminder: ${task.name}`, {
                body: "Time to tick this one off.",
                tag: task.id,
              });
            } catch (e) {
              /* some mobile browsers only allow notifications from a service worker */
            }
          }, wait)
        );
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [tasks, permission]);

  const enableNotifications = async () => {
    if (!("Notification" in window)) return;
    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const addTask = useCallback(
    async ({ name, dueDate, dueTime, priority, reminder }) => {
      try {
        await addDoc(collection(db, "tasks"), {
          name,
          completed: false,
          userId: user.uid,
          createdAt: serverTimestamp(),
          dueDate,
          dueTime,
          priority: normalisePriority(priority),
          reminder,
        });
        setError(null);
        return true;
      } catch (e) {
        setError("Couldn't add that task. Please try again.");
        return false;
      }
    },
    [user.uid]
  );

  const toggleTask = useCallback(async (id, completed) => {
    try {
      await updateDoc(doc(db, "tasks", id), { completed: !completed });
    } catch (e) {
      setError("Couldn't update that task. Please try again.");
    }
  }, []);

  const renameTask = useCallback(async (id, name) => {
    try {
      await updateDoc(doc(db, "tasks", id), { name });
    } catch (e) {
      setError("Couldn't rename that task. Please try again.");
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (e) {
      setError("Couldn't delete that task. Please try again.");
    }
  }, []);

  const clearCompleted = async () => {
    const done = tasks.filter((t) => t.completed);
    if (!done.length) return;
    if (!window.confirm(`Delete ${done.length} completed task${done.length > 1 ? "s" : ""}?`)) return;
    try {
      const batch = writeBatch(db);
      done.forEach((t) => batch.delete(doc(db, "tasks", t.id)));
      await batch.commit();
    } catch (e) {
      setError("Couldn't clear completed tasks. Please try again.");
    }
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    return {
      total,
      completed,
      active: total - completed,
      today: tasks.filter((t) => !t.completed && isDueToday(t, now)).length,
      overdue: tasks.filter((t) => isOverdue(t, now)).length,
      pct: total ? Math.round((completed / total) * 100) : 0,
    };
  }, [tasks, now]);

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = tasks.filter((t) => {
      if (filter === "active" && t.completed) return false;
      if (filter === "completed" && !t.completed) return false;
      if (filter === "overdue" && !isOverdue(t, now)) return false;
      if (q && !String(t.name || "").toLowerCase().includes(q)) return false;
      return true;
    });
    return sortTasks(filtered, sortBy);
  }, [tasks, filter, search, sortBy, now]);

  const counts = { all: stats.total, active: stats.active, completed: stats.completed, overdue: stats.overdue };
  const firstName = user.isAnonymous ? "" : (user.displayName || "").split(" ")[0];

  return (
    <div className="container">
      <div className="dash-head">
        <div>
          <h1>
            {greeting()}
            {firstName ? `, ${firstName}` : ""}
          </h1>
          <p>
            {stats.active === 0
              ? "You're all caught up."
              : `You have ${stats.active} task${stats.active > 1 ? "s" : ""} to do${
                  stats.today ? `, ${stats.today} due today` : ""
                }.`}
          </p>
        </div>
      </div>

      <div className="stats">
        <div className="card stat">
          <span className="tile sm violet">
            <ListIcon />
          </span>
          <div>
            <strong>{stats.total}</strong>
            <span>Total</span>
          </div>
        </div>
        <div className="card stat">
          <span className="tile sm green">
            <CheckIcon />
          </span>
          <div>
            <strong>{stats.completed}</strong>
            <span>Done</span>
          </div>
        </div>
        <div className="card stat">
          <span className="tile sm blue">
            <CalendarIcon />
          </span>
          <div>
            <strong>{stats.today}</strong>
            <span>Due today</span>
          </div>
        </div>
        <div className="card stat">
          <span className="tile sm pink">
            <AlertIcon />
          </span>
          <div>
            <strong>{stats.overdue}</strong>
            <span>Overdue</span>
          </div>
        </div>
        <div className="card stat progress-card">
          <div className="ring" style={{ "--p": stats.pct }}>
            <span>{stats.pct}%</span>
          </div>
          <div>
            <strong style={{ fontSize: "1.05rem" }}>Progress</strong>
            <span>
              {stats.completed} of {stats.total} complete
            </span>
          </div>
        </div>
      </div>

      {user.isAnonymous && (
        <div className="banner">
          <span className="tile sm slate">
            <UserIcon />
          </span>
          <p>You're using a guest account. Your tasks stay in this browser; sign in with Google to use them anywhere.</p>
        </div>
      )}

      {permission === "default" && (
        <div className="banner">
          <span className="tile sm amber">
            <BellIcon />
          </span>
          <p>Turn on notifications to get reminders while TickTask is open.</p>
          <button type="button" className="btn btn-sm" onClick={enableNotifications}>
            Enable
          </button>
        </div>
      )}

      {error && (
        <div className="banner error" role="alert">
          <span className="tile sm pink">
            <AlertIcon />
          </span>
          <p>{error}</p>
          <button type="button" className="btn-text" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      <TaskInput addTask={addTask} />

      <div className="toolbar">
        <div className="search">
          <SearchIcon />
          <label htmlFor="task-search" className="sr-only">
            Search tasks
          </label>
          <input
            id="task-search"
            type="search"
            placeholder="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="segmented" role="tablist" aria-label="Filter tasks">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={filter === f.key}
              className={filter === f.key ? "active" : ""}
              onClick={() => setFilter(f.key)}
            >
              {f.label} <span className="count">{counts[f.key]}</span>
            </button>
          ))}
        </div>
        <label htmlFor="sort" className="sr-only">
          Sort tasks
        </label>
        <select id="sort" className="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="due">Sort: Due date</option>
          <option value="priority">Sort: Priority</option>
          <option value="newest">Sort: Newest</option>
        </select>
      </div>

      {loading ? (
        <div className="spinner" role="status" aria-label="Loading tasks" />
      ) : (
        <>
          <TaskList
            tasks={visible}
            emptyText={search ? "No tasks match your search." : EMPTY_TEXT[filter]}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onRename={renameTask}
          />
          {tasks.length > 0 && (
            <div className="list-foot">
              <span>Double-click a task to rename it.</span>
              {stats.completed > 0 && (
                <button type="button" className="btn-text" onClick={clearCompleted}>
                  Clear completed ({stats.completed})
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
