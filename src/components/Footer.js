import React from "react";
import { Link } from "react-router-dom";
import { LogoIcon } from "./Icons";

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <Link to="/" className="brand">
            <span className="brand-mark">
              <LogoIcon />
            </span>
            TickTask
          </Link>
          <p>A simple, fast task manager with due dates, priorities and reminders.</p>
        </div>
        <ul className="footer-links">
          <li>
            <Link to="/features">Features</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <a href="https://github.com/Chiefopoku/ticktask" target="_blank" rel="noopener noreferrer">
              Source code
            </a>
          </li>
          <li>
            <a href="https://chiefopoku.github.io/portfolio/" target="_blank" rel="noopener noreferrer">
              Developer
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} TickTask. Built by Emmanuel Opoku-Adjei.</span>
        <span>React &middot; Firebase</span>
      </div>
    </div>
  </footer>
);

export default Footer;
