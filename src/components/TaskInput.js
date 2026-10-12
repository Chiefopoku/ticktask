import React, { useState } from "react";
import { REMINDER_OPTIONS, dueAt } from "./taskUtils";

const TaskInput = ({ addTask }) => {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("medium");
  const [reminderOffset, setReminderOffset] = useState("");
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setName("");
    setDueDate("");
    setDueTime("");
    setPriority("medium");
    setReminderOffset("");
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give your task a name.");
      return;
    }

    let reminder = null;
    if (reminderOffset !== "") {
      if (!dueDate) {
        setError("Pick a due date to set a reminder.");
        return;
      }
      const due = dueAt({ dueDate, dueTime: dueTime || "09:00" });
      reminder = new Date(due.getTime() - Number(reminderOffset) * 60000).toISOString();
    }

    setSaving(true);
    const ok = await addTask({
      name: trimmed,
      dueDate: dueDate || null,
      dueTime: dueDate && dueTime ? dueTime : null,
      priority,
      reminder,
    });
    setSaving(false);
    if (ok) reset();
  };

  return (
    <form className="card add-task" onSubmit={handleSubmit}>
      <div className="add-row">
        <label htmlFor="task-name" className="sr-only">
          Task name
        </label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(null);
          }}
          placeholder="What do you need to do?"
          autoComplete="off"
          maxLength={200}
        />
        <button type="submit" className="btn" disabled={saving}>
          {saving ? "Adding…" : "Add task"}
        </button>
      </div>

      <div className="add-options">
        <div className="field">
          <label htmlFor="due-date">Due date</label>
          <input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="due-time">Time</label>
          <input
            id="due-time"
            type="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
            disabled={!dueDate}
          />
        </div>
        <div className="field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="reminder">Reminder</label>
          <select id="reminder" value={reminderOffset} onChange={(e) => setReminderOffset(e.target.value)}>
            {REMINDER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default TaskInput;
