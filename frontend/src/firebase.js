// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqC7V1TPl-bayOwd5Xi3wlWrr1GlFs9mQ",
  authDomain: "ticktask-944d7.firebaseapp.com",
  projectId: "ticktask-944d7",
  storageBucket: "ticktask-944d7.appspot.com",
  messagingSenderId: "504566858572",
  appId: "1:504566858572:web:d769b0541c8c872f9e05e9",
  measurementId: "G-NWGWQHP6B0",
};

// Initialize Firebase
const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
