import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
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

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null); // Track any errors

  // Fetch tasks in real-time for the authenticated user
  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.uid) // Fetch tasks only for this user
    );

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let tasksArr = [];
        querySnapshot.forEach((doc) => {
          tasksArr.push({ ...doc.data(), id: doc.id });
        });
        setTasks(tasksArr);
      },
      (error) => {
        console.error("Error fetching tasks: ", error);
        setError("Error fetching tasks.");
      }
    );

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [user.uid]);

  const addTask = async (taskName) => {
    try {
      await addDoc(collection(db, "tasks"), {
        name: taskName,
        completed: false,
        userId: user.uid, // Link task to the user
      });
    } catch (error) {
      console.error("Error adding task: ", error);
      setError("Error adding task.");
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await updateDoc(taskDocRef, { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
      setError("Error updating task.");
    }
  };

  const deleteTask = async (taskId) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
      setError("Error deleting task.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.displayName}</h1>
      <button onClick={onLogout}>Logout</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display errors */}
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default Dashboard;
