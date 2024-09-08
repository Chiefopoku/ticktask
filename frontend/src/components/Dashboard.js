import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "./Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch user and tasks after component loads
  useEffect(() => {
    // Fetch authenticated user profile
    axios
      .get("http://localhost:8000/accounts/profile/", { withCredentials: true })
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching user:", error));

    // Fetch user's tasks from the Django backend
    axios
      .get("http://localhost:8000/api/tasks/", { withCredentials: true })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = (taskName) => {
    const newTask = { name: taskName, completed: false };
    setTasks([...tasks, newTask]);

    // Optionally post this task to the backend
    axios
      .post("http://localhost:8000/api/tasks/", newTask, {
        withCredentials: true,
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);

    // Optionally delete task from backend
    axios
      .delete(`http://localhost:8000/api/tasks/${index}/`, {
        withCredentials: true,
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);

    // Optionally update task completion in backend
    axios
      .put(`http://localhost:8000/api/tasks/${index}/`, updatedTasks[index], {
        withCredentials: true,
      })
      .catch((error) => console.error("Error updating task:", error));
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.username}</h2>
          <TaskInput addTask={addTask} />
          <TaskList
            tasks={tasks}
            removeTask={removeTask}
            toggleTask={toggleTask}
          />
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Dashboard;
