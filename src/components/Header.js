import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from "./Icons";

const Header = ({ user, onLogin, onLogout, theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const initial = user && !user.isAnonymous && user.displayName ? user.displayName.charAt(0).toUpperCase() : "G";

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <Link to="/" className="brand" onClick={close}>
          <span className="brand-mark">
            <LogoIcon />
          </span>
          TickTask
        </Link>

        <nav aria-label="Main">
          <ul className={`nav-links ${open ? "open" : ""}`}>
            <li>
              <NavLink to="/" end onClick={close}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/features" onClick={close}>
                Features
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={close}>
                About
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard" onClick={close}>
                  My tasks
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {user ? (
            <>
              {user.photoURL ? (
                <img className="avatar hide-sm" src={user.photoURL} alt="" referrerPolicy="no-referrer" />
              ) : (
                <span className="avatar hide-sm" aria-hidden="true">
                  {initial}
                </span>
              )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  close();
                  onLogout();
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                close();
                onLogin();
              }}
            >
              Sign in
            </button>
          )}

          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
