import React from "react";
import "./TaskItem.css"; // Assuming you have CSS for TaskItem styling

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { name, completed, dueDate, reminder } = task;

  return (
    <li className={`task-item ${completed ? "completed" : ""}`}>
      <div className="task-info">
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => toggleTaskCompletion(task.id, completed)}
          />
          <span className="checkmark"></span>
        </label>
        <span className={`task-name ${completed ? "task-completed" : ""}`}>
          {name}
        </span>
        {dueDate && (
          <div className="task-due-date">
            <small>Due: {new Date(dueDate).toLocaleString()}</small>
          </div>
        )}
        {reminder && (
          <div className="task-reminder">
            <small>Reminder: {new Date(reminder).toLocaleString()}</small>
          </div>
        )}
      </div>
      <button
        className="delete-btn"
        aria-label={`Delete task: ${name}`}
        onClick={() => deleteTask(task.id)}
      >
        🗑️
      </button>
    </li>
  );
};

export default TaskItem;
