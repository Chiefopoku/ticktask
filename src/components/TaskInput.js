import React, { useState } from "react";
import "./TaskInput.css";

const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState("");
  const [priority, setPriority] = useState("Low");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    let reminderDateTime = null;

    // Only set reminder if user selected a valid reminder time
    if (reminder && dueDate) {
      try {
        const selectedDate = new Date(dueDate);

        if (isNaN(selectedDate.getTime())) {
          throw new Error("Invalid due date");
        }

        const [hours, minutes] = reminder.split(":");
        if (!hours || !minutes) {
          throw new Error("Invalid reminder time");
        }

        selectedDate.setHours(parseInt(hours, 10));
        selectedDate.setMinutes(parseInt(minutes, 10));

        reminderDateTime = selectedDate.toISOString(); // Store as ISO string
        console.log("Reminder set for:", reminderDateTime);
      } catch (err) {
        setError("Invalid reminder time or date");
        return;
      }
    }

    addTask(taskName, dueDate, reminderDateTime, priority);
    setTaskName("");
    setDueDate("");
    setReminder("");
    setPriority("Low");
    setError(null);
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
