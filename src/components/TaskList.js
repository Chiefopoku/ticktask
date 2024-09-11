import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css"; // Assuming you have CSS for TaskList styling

const TaskList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  // Display task count
  const taskCount = tasks.length;

  return (
    <div className="task-list-container">
      {/* Task count display */}
      <div className="task-list-header">
        {taskCount > 0 ? (
          <h2>
            You have {taskCount} {taskCount > 1 ? "tasks" : "task"} to do
          </h2>
        ) : (
          <h2>No tasks yet! Add a new task to get started.</h2>
        )}
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleTaskCompletion={toggleTaskCompletion}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <li className="no-tasks-message">You have no tasks pending.</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
