import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({
  isAuthenticated,
  onLogout,
  handleSearch,
  theme,
  toggleTheme,
}) => {
  return (
    <header className="header">
      <div className="header-brand">
        <h1>TickTask</h1>
      </div>
      <nav>
        <ul className="navbar">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="search-bar"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </li>
              <li>
                <Link to="/notifications" className="notification-link">
                  <span className="notification-icon">🔔</span>
                  <span className="badge">3</span>
                  {/* Notification count */}
                </Link>
              </li>
              <li className="nav-item dropdown">
                <button className="dropdown-btn">Profile</button>
                <div className="dropdown-content">
                  <Link to="/profile">My Profile</Link>
                  <Link to="/settings">Settings</Link>
                </div>
              </li>
              <li>
                <button onClick={toggleTheme} className="theme-btn">
                  {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                </button>
              </li>
              <li>
                <button onClick={onLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
