import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, toggleTaskCompletion, deleteTask }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span className="task-name" onClick={() => toggleTaskCompletion(task.id)}>
        {task.name}
      </span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        ✕
      </button>
    </li>
  );
};

export default TaskItem;
