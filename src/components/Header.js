import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Assuming you have a separate CSS for header

const Header = ({ isAuthenticated, onLogin, onLogout, theme, toggleTheme }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">
          <Link to="/">TickTask</Link>
        </h1>
        <nav className="nav">
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

            {/* Only show the Dashboard link if the user is authenticated */}
            {isAuthenticated && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )}

            {!isAuthenticated ? (
              <li>
                <button className="login-btn" onClick={onLogin}>
                  Login
                </button>
              </li>
            ) : (
              <li>
                <button className="logout-btn" onClick={onLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile menu toggle (optional, if you have mobile styling) */}
        <div className="mobile-menu">
          <span className="menu-icon">&#9776;</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
