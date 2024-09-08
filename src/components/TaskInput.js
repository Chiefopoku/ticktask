import React, { useState } from "react";
import "./TaskInput.css"; // Import the CSS file for styling

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask(""); // Clear the input field after adding the task
    }
  };

  return (
    <form className="task-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a new task..."
        className="task-input-field"
      />
      <button type="submit" className="task-input-button">
        Add Task
      </button>
    </form>
  );
};

export default TaskInput;
