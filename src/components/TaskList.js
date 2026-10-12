import React from "react";
import TaskItem from "./TaskItem";
import { ListIcon } from "./Icons";

const TaskList = ({ tasks, emptyText, onToggle, onDelete, onRename }) => {
  if (!tasks.length) {
    return (
      <div className="empty">
        <span className="tile violet">
          <ListIcon />
        </span>
        <p style={{ margin: 0 }}>{emptyText}</p>
      </div>
    );
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onRename={onRename} />
      ))}
    </ul>
  );
};

export default TaskList;
