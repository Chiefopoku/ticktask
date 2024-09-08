import React from "react";
import "./TaskItem.css";

const TaskItem = ({ task, removeTask, toggleTask }) => {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={toggleTask} className="task-name">
        {task.name}
      </span>
      <button onClick={removeTask} className="delete-btn">
        ❌
      </button>
    </li>
  );
};

export default TaskItem;
