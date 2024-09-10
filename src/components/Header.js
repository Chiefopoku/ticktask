import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isAuthenticated, onLogin, onLogout, theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">
          <Link to="/">TickTask</Link>
        </h1>
        <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
            </li>
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
        <div className="mobile-menu" onClick={handleMobileMenuToggle}>
          <span className="menu-icon">&#9776;</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
