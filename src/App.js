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
import { auth, GoogleAuthProvider, signInWithPopup } from "./firebase";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showLoginModal, setShowLoginModal] = useState(false);

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
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        setShowLoginModal(false);
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

  const closeLoginModal = () => {
    setShowLoginModal(false);
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
          <Route path="/" element={<LandingPage />} />

          {/* Other pages */}
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
          {/* Redirect any unknown routes back to landing page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>

      {showLoginModal && (
        <div className="modal-overlay" onClick={closeLoginModal}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeLoginModal}>
              &times;
            </button>
            <Login onLogin={handleLogin} onClose={closeLoginModal} />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
