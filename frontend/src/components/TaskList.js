import React from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = ({ tasks, removeTask, toggleTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          removeTask={() => removeTask(index)}
          toggleTask={() => toggleTask(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
