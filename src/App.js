import React, { useState, useEffect, useRef } from "react";
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
  signInWithRedirect,
  getRedirectResult,
} from "./firebase";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [handlingRedirect, setHandlingRedirect] = useState(false);
  const initialLoad = useRef(true); // Use this to track the initial load

  // Check for redirect result only on first load
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          setUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          setHandlingRedirect(false);
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
      }
    };

    // Ensure this runs only on initial load
    if (initialLoad.current) {
      initialLoad.current = false;
      checkRedirectResult();
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setHandlingRedirect(false);
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle Google login with redirect
  const handleLogin = () => {
    if (!user && !handlingRedirect) {
      setHandlingRedirect(true); // Set the flag to prevent double execution
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider).catch((error) => {
        setHandlingRedirect(false); // Reset the flag if error occurs
        console.error("Error during login:", error);
      });
    }
  };

  // Handle logout
  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    localStorage.removeItem("user");
  };

  // Theme toggle
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
