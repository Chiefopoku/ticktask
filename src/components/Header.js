import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Assuming you have a separate CSS for header

const Header = ({ isAuthenticated, onLogin, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close the mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">
          <Link to="/" onClick={closeMobileMenu}>
            TickTask
          </Link>
        </h1>

        <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/features" onClick={closeMobileMenu}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu}>
                About
              </Link>
            </li>

            {isAuthenticated && (
              <li>
                <Link to="/dashboard" onClick={closeMobileMenu}>
                  Dashboard
                </Link>
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
                <button
                  className="logout-btn"
                  onClick={() => {
                    onLogout();
                    closeMobileMenu(); // Ensure the menu closes on logout
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <div className="mobile-menu" onClick={toggleMobileMenu}>
          <span className="menu-icon">&#9776;</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
