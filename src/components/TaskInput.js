import React, { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      addTask(taskName, dueDate, reminder);
      setTaskName("");
      setDueDate("");
      setReminder("");
    }
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due date"
      />
      <input
        type="time"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        placeholder="Reminder time"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskInput;
