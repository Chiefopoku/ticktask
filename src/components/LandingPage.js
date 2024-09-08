import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ isAuthenticated, onLogin, theme, toggleTheme }) => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-brand">TickTask</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <button className="theme-btn" onClick={toggleTheme}>
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </li>
              {!isAuthenticated ? (
                <li>
                  <button className="login-btn" onClick={onLogin}>
                    Login
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Organize your tasks with TickTask</h2>
          <p>
            TickTask helps you manage your time and tasks efficiently. Stay on
            top of your to-do list and get more done.
          </p>
          {!isAuthenticated && (
            <button className="cta-btn" onClick={onLogin}>
              Get Started
            </button>
          )}
        </div>
      </section>

      {/* Additional Sections */}
      <section className="features-section">
        <h3>Why Choose TickTask?</h3>
        <ul>
          <li>Manage tasks easily with an intuitive interface.</li>
          <li>Get reminders and notifications.</li>
          <li>Access your tasks from anywhere.</li>
        </ul>
      </section>

      <footer className="footer">
        <p>&copy; 2024 TickTask. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
