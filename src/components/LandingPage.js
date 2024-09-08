import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Import the updated CSS

const LandingPage = ({ isAuthenticated, onLogin, theme, toggleTheme }) => {
  return (
    <div className="landing-page">
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
          <h2>Stay Organized with TickTask</h2>
          <p>
            Manage your tasks effectively and boost your productivity with
            TickTask. Track your tasks, set reminders, and reach your goals.
          </p>
          {!isAuthenticated && (
            <button className="cta-btn" onClick={onLogin}>
              Get Started
            </button> // Use onLogin to open modal
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <h3>Why Choose TickTask?</h3>
          <div className="feature-items">
            <div className="feature-item">
              <h4>Easy Task Management</h4>
              <p>Manage and track your tasks with a user-friendly interface.</p>
            </div>
            <div className="feature-item">
              <h4>Set Reminders</h4>
              <p>Never miss a deadline by setting up task reminders.</p>
            </div>
            <div className="feature-item">
              <h4>Access Anywhere</h4>
              <p>Access your tasks from any device, anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TickTask. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
