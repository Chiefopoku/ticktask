import React, { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask(""); // Clear the input after adding a task
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
