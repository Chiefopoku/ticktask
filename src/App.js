import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import FeaturesPage from "./components/FeaturesPage";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "./firebase";
import { isMobile } from "react-device-detect"; // Detect if user is on mobile
import Header from "./components/Header";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null); // State to store any login errors

  // Check authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Google login with mobile detection
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    if (isMobile) {
      // Use signInWithRedirect for mobile devices
      signInWithRedirect(auth, provider).catch((error) => {
        setError("Failed to sign in on mobile. Please try again.");
        console.error("Error during mobile login:", error);
      });
    } else {
      // Use signInWithPopup for desktop
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
          setShowLoginModal(false);
          setError(null); // Clear any errors on successful login
        })
        .catch((error) => {
          setError("Failed to sign in. Please try again.");
          console.error("Error during login:", error);
        });
    }
  };

  // Handle logout
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setError("Failed to log out. Please try again.");
        console.error("Error during logout:", error);
      });
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Close login modal
  const closeLoginModal = () => {
    setShowLoginModal(false);
    setError(null); // Clear any errors when modal is closed
  };

  return (
    <Router>
      <Header
        isAuthenticated={!!user}
        onLogin={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className={`app ${theme} ${showLoginModal ? "blurred" : ""}`}>
        <Routes>
          {/* Default route is the landing page */}
          <Route
            path="/"
            element={
              <LandingPage
                isAuthenticated={!!user}
                onLogin={() => setShowLoginModal(true)}
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />

          {/* Other pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />

          {/* Redirect any unknown routes back to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {/* Login modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeLoginModal}>
              &times;
            </button>
            <Login onLogin={handleLogin} onClose={closeLoginModal} />
            {/* Display error message if login fails */}
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
