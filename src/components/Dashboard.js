import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Firestore setup
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "./Dashboard.css"; // Assuming you have CSS for Dashboard styling

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  // Fetch tasks for the authenticated user
  useEffect(() => {
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let tasksArr = [];
        querySnapshot.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });

        // Sort tasks by due date
        tasksArr.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));

        setTasks(tasksArr);

        // Calculate task completion progress
        const completedTasks = tasksArr.filter((task) => task.completed).length;
        setProgress((completedTasks / tasksArr.length) * 100);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        setError("Error fetching tasks. Please try again.");
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  const addTask = async (taskName, dueDate, reminder) => {
    try {
      await addDoc(collection(db, "tasks"), {
        name: taskName,
        completed: false,
        dueDate: dueDate || null,
        reminder: reminder || null,
        userId: user.uid,
      });
    } catch (error) {
      console.error("Error adding task: ", error);
      setError("Error adding task. Please try again.");
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await updateDoc(taskDocRef, { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
      setError("Error updating task. Please try again.");
    }
  };

  const deleteTask = async (taskId) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
      setError("Error deleting task. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.displayName}</h1>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {error && <p className="error-message">{error}</p>}

      <TaskInput addTask={addTask} />

      <section className="task-section">
        <h2>Your Tasks</h2>

        {/* Task Completion Progress Bar */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}>
            {progress.toFixed(0)}% Completed
          </div>
        </div>

        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            toggleTaskCompletion={toggleTaskCompletion}
            deleteTask={deleteTask}
          />
        ) : (
          <p>No tasks yet. Add a new one!</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
