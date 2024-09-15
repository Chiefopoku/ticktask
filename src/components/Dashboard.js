import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import "./Dashboard.css"; // Assuming you have CSS for Dashboard styling

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window) {
      if (
        Notification.permission !== "granted" &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission();
      }
    }
  }, []);

  // Function to trigger a notification with safe checks
  const triggerNotification = (taskName, reminderTime) => {
    // Check if the Notification API is available in the browser
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }

    // Check if permission has been granted
    if (Notification.permission === "granted") {
      const notificationTitle = `Reminder: ${taskName}`;
      const notificationOptions = {
        body: `Your task "${taskName}" is due by ${new Date(
          reminderTime
        ).toLocaleString()}`,
        icon: "/path-to-icon/icon.png", // Optional: add your app icon path here
      };

      new Notification(notificationTitle, notificationOptions);
    } else if (Notification.permission !== "denied") {
      // Request permission if it's not denied
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notificationTitle = `Reminder: ${taskName}`;
          const notificationOptions = {
            body: `Your task "${taskName}" is due by ${new Date(
              reminderTime
            ).toLocaleString()}`,
            icon: "/path-to-icon/icon.png",
          };

          new Notification(notificationTitle, notificationOptions);
        }
      });
    }
  };

  // Add task function
  const addTask = async (taskName, dueDate, reminder) => {
    try {
      if (!taskName.trim()) {
        throw new Error("Task name cannot be empty.");
      }

      const taskData = {
        name: taskName,
        completed: false,
        userId: user.uid, // Make sure user ID is correctly added
        createdAt: new Date(),
        dueDate: dueDate || null,
        reminder: reminder || null,
      };

      // Adding task to Firestore
      await addDoc(collection(db, "tasks"), taskData);

      console.log("Task added successfully:", taskData); // Log success for debugging
    } catch (error) {
      console.error("Error adding task:", error.message);
      setError("Error adding task. Please try again.");
    }
  };

  // Fetch tasks for the authenticated user and check for reminders
  useEffect(() => {
    console.log("Fetching tasks for user:", user.uid); // Log the user ID

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const tasksArr = [];
        querySnapshot.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });

        console.log("Fetched tasks:", tasksArr); // Log fetched tasks

        // Sort tasks by due date
        tasksArr.sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));

        setTasks(tasksArr);

        // Calculate task completion progress
        const completedTasks = tasksArr.filter((task) => task.completed).length;
        setProgress((completedTasks / tasksArr.length) * 100);
        setLoading(false); // Stop loading when tasks are fetched

        // Check for tasks with reminders within the next hour and trigger notifications
        const now = new Date();
        tasksArr.forEach((task) => {
          if (task.reminder && !task.completed) {
            const reminderTime = new Date(task.reminder);
            if (
              reminderTime > now &&
              (reminderTime - now) / (1000 * 60) <= 60
            ) {
              console.log(`Triggering notification for task: ${task.name}`);
              triggerNotification(task.name, reminderTime);
            }
          }
        });
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        setError("Error fetching tasks. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user.uid]);

  // Toggle task completion
  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await updateDoc(taskDocRef, { completed: !completed });
      console.log(
        `Task ${taskId} marked as ${!completed ? "completed" : "pending"}`
      );
    } catch (error) {
      console.error("Error updating task: ", error);
      setError("Error updating task. Please try again.");
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await deleteDoc(taskDocRef);
      console.log(`Task ${taskId} deleted`);
    } catch (error) {
      console.error("Error deleting task: ", error);
      setError("Error deleting task. Please try again.");
    }
  };

  // Filter tasks based on filter state
  const getFilteredTasks = () => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {user.displayName}</h1>
      </header>

      {error && <p className="error-message">{error}</p>}

      {/* Loading Indicator */}
      {loading ? (
        <div className="loading-spinner">Loading tasks...</div>
      ) : (
        <>
          {/* Task Input Form */}
          <TaskInput addTask={addTask} />

          <section className="task-section">
            <h2>Your Tasks</h2>

            {/* Filter Buttons */}
            <div className="filter-buttons">
              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter === "completed" ? "active" : ""}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
              <button
                className={filter === "pending" ? "active" : ""}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
            </div>

            {/* Task Completion Progress Bar */}
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}>
                {progress.toFixed(0)}% Completed
              </div>
            </div>

            {/* Task List */}
            {getFilteredTasks().length > 0 ? (
              <TaskList
                tasks={getFilteredTasks()}
                toggleTaskCompletion={toggleTaskCompletion}
                deleteTask={deleteTask}
              />
            ) : (
              <p>No tasks yet. Add a new one!</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
