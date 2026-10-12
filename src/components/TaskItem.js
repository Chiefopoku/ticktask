import React, { useState, useRef, useEffect } from "react";
import { EditIcon, TrashIcon, CalendarIcon, BellIcon, FlagIcon, CheckIcon, CloseIcon } from "./Icons";
import { normalisePriority, formatDue, formatReminder, isOverdue, isDueToday } from "./taskUtils";

const LABEL = { high: "High", medium: "Medium", low: "Low" };

const TaskItem = ({ task, onToggle, onDelete, onRename }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const priority = normalisePriority(task.priority);
  const due = formatDue(task);
  const overdue = isOverdue(task);
  const today = !overdue && isDueToday(task);
  const reminder = task.reminder && !task.completed ? formatReminder(task.reminder) : null;

  const startEdit = () => {
    setDraft(task.name);
    setEditing(true);
  };
  const save = () => {
    const v = draft.trim();
    if (v && v !== task.name) onRename(task.id, v);
    setEditing(false);
  };
  const cancel = () => {
    setDraft(task.name);
    setEditing(false);
  };

  return (
    <li className={`task ${task.completed ? "is-done" : ""}`}>
      <input
        type="checkbox"
        className="check"
        checked={!!task.completed}
        onChange={() => onToggle(task.id, task.completed)}
        aria-label={task.completed ? `Mark "${task.name}" as not done` : `Mark "${task.name}" as done`}
      />

      <div className="task-body">
        {editing ? (
          <form
            className="task-edit"
            onSubmit={(e) => {
              e.preventDefault();
              save();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={draft}
              maxLength={200}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") cancel();
              }}
              aria-label="Task name"
            />
            <button type="submit" className="icon-btn" aria-label="Save">
              <CheckIcon />
            </button>
            <button type="button" className="icon-btn" onClick={cancel} aria-label="Cancel editing">
              <CloseIcon />
            </button>
          </form>
        ) : (
          <>
            <p className="task-name" onDoubleClick={startEdit} title="Double-click to edit">
              {task.name}
            </p>
            <div className="task-meta">
              <span className={`pill ${priority}`}>
                <FlagIcon /> {LABEL[priority]}
              </span>
              {due && (
                <span className={`pill ${overdue ? "overdue" : today ? "today" : "due"}`}>
                  <CalendarIcon /> {overdue ? `Overdue · ${due}` : due}
                </span>
              )}
              {reminder && (
                <span className="pill due" title="Reminder">
                  <BellIcon /> {reminder}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      {!editing && (
        <div className="task-actions">
          <button type="button" className="icon-btn" onClick={startEdit} aria-label={`Edit "${task.name}"`}>
            <EditIcon />
          </button>
          <button
            type="button"
            className="icon-btn danger"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete "${task.name}"`}
          >
            <TrashIcon />
          </button>
        </div>
      )}
    </li>
  );
};

export default TaskItem;
