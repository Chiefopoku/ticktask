import React from "react";
import "./TaskItem.css"; // Assuming you have CSS for TaskItem styling

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  const { name, completed, dueDate, reminder } = task;

  return (
    <li className={`task-item ${completed ? "completed" : ""}`}>
      <div className="task-info">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTaskCompletion(task.id, completed)}
        />
        <span>{name}</span>
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
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
