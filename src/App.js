import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Import Firebase auth
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  // State to store the authenticated user
  const [user, setUser] = useState(null);

  // UseEffect hook to listen for changes in authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is authenticated, set the user state
        setUser(user);
      } else {
        // If the user is not authenticated, set the user state to null
        setUser(null);
      }
    });

    // Clean up the onAuthStateChanged listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Function to handle Google Sign-In
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Set the authenticated user
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  // Function to handle user sign-out
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Reset the user state to null after logout
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div>
      {/* Render Dashboard if user is logged in, otherwise render Login */}
      {user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
