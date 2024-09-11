import React, { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [priority, setPriority] = useState("Low"); // New priority state
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      setError("Task name is required.");
      return;
    }

    // Clear error if inputs are valid
    setError(null);

    addTask(taskName, dueDate, reminder, priority);
    setTaskName("");
    setDueDate("");
    setReminder("");
    setPriority("Low");
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name *"
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="due-date">Due Date:</label>
        <input
          type="date"
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="reminder">Reminder Time:</label>
        <input
          type="time"
          id="reminder"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="button-group">
        <button type="submit" className="add-btn">
          Add Task
        </button>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            setTaskName("");
            setDueDate("");
            setReminder("");
            setPriority("Low");
            setError(null);
          }}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
