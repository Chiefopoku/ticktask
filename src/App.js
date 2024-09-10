import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import FeaturesPage from "./components/FeaturesPage";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import { auth, GoogleAuthProvider, signInWithPopup } from "./firebase";
import Header from "./components/Header";
import "./App.css"; // Assuming you're adding CSS for modal and blur effects

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showLoginModal, setShowLoginModal] = useState(false); // Modal state

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

  const handleLogin = () => {
    // Google sign-in logic
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setShowLoginModal(false); // Close modal on successful login
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Close modal when clicking outside the modal content or on the "X"
  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Router>
      <Header
        isAuthenticated={!!user}
        onLogin={() => setShowLoginModal(true)} // Show modal on login click
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className={`app ${theme} ${showLoginModal ? "blurred" : ""}`}>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isAuthenticated={!!user}
                onLogin={() => setShowLoginModal(true)} // Show modal on "Get Started"
                theme={theme}
                toggleTheme={toggleTheme}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user}>
                <Dashboard user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      {/* Conditionally render the login modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeLoginModal}>
              &times;
            </button>
            <Login onLogin={handleLogin} onClose={closeLoginModal} />{" "}
            {/* Pass onClose */}
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
