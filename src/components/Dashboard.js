import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Dashboard = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks in real-time
  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArr);
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (taskName) => {
    try {
      await addDoc(collection(db, "tasks"), {
        name: taskName,
        completed: false,
        userId: user.uid,
      });
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await updateDoc(taskDocRef, { completed: !completed });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    const taskDocRef = doc(db, "tasks", taskId);
    try {
      await deleteDoc(taskDocRef);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.displayName}</h1>
      <button onClick={onLogout}>Logout</button>
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
