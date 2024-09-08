import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import FeaturesPage from "./components/FeaturesPage";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login"; // Import Login component
import PrivateRoute from "./components/PrivateRoute";
import { auth, GoogleAuthProvider, signInWithPopup } from "./firebase"; // Ensure GoogleAuthProvider and signInWithPopup are imported

function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State to manage login modal

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
        console.log("Login successful!", result.user);
        setIsLoginModalOpen(false); // Close the modal after login
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <div className={`app ${theme}`}>
        {/* Content that may blur */}
        <div className={`content ${isLoginModalOpen ? "blur" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <LandingPage
                  isAuthenticated={!!user}
                  onLogin={() => setIsLoginModalOpen(true)} // Trigger login modal
                  theme={theme}
                  toggleTheme={toggleTheme}
                />
              }
            />
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
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </div>

        {/* Render the login modal */}
        {isLoginModalOpen && (
          <Login
            onLogin={handleLogin}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
