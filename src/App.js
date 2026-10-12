import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import FeaturesPage from "./components/FeaturesPage";
import AboutPage from "./components/AboutPage";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { auth, getRedirectResult } from "./firebase";

// Light/dark theme: remembers the user's choice, otherwise follows the system.
function getInitialTheme() {
  try {
    const saved = localStorage.getItem("ticktask-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("ticktask-theme", theme);
    } catch (e) {
      /* storage unavailable */
    }
  }, [theme]);

  // Firebase keeps the session; wait for it before deciding where to send the user.
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) navigate("/dashboard");
      })
      .catch(() => {
        /* no redirect in progress */
      });

    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [navigate]);

  const openLogin = useCallback(() => setShowLogin(true), []);
  const closeLogin = useCallback(() => setShowLogin(false), []);

  const handleSignedIn = useCallback(() => {
    setShowLogin(false);
    navigate("/dashboard");
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    await auth.signOut();
    navigate("/");
  }, [navigate]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "light" ? "dark" : "light")),
    []
  );

  useEffect(() => {
    if (!showLogin) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setShowLogin(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLogin]);

  const isAuthenticated = !!user;

  return (
    <>
      <ScrollToTop />
      <Header
        user={user}
        onLogin={openLogin}
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<LandingPage isAuthenticated={isAuthenticated} onLogin={openLogin} />}
          />
          <Route
            path="/features"
            element={<FeaturesPage isAuthenticated={isAuthenticated} onLogin={openLogin} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <div className="login-page">
                  <Login onSignedIn={handleSignedIn} />
                </div>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute user={user} authReady={authReady}>
                <Dashboard user={user} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />

      {showLogin && (
        <div className="modal-overlay" onClick={closeLogin} role="presentation">
          <div onClick={(e) => e.stopPropagation()} role="presentation">
            <Login onSignedIn={handleSignedIn} onClose={closeLogin} />
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
