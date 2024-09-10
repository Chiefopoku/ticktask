import React from "react";
import "./LandingPage.css";

const LandingPage = ({ isAuthenticated, onLogin, theme, toggleTheme }) => {
  return (
    <div className={`landing-page ${theme}`}>
      {/* Features Section */}
      <section className="features-section">
        <h3>Why Choose TickTask?</h3>
        <div className="feature-items">
          <div className="feature-item">
            <h4>Easy Task Management</h4>
            <p>
              Manage and track your tasks effortlessly with an intuitive and
              streamlined interface.
            </p>
          </div>
          <div className="feature-item">
            <h4>Set Task Reminders</h4>
            <p>
              Never miss an important task by scheduling reminders and setting
              due dates.
            </p>
          </div>
          <div className="feature-item">
            <h4>Access From Anywhere</h4>
            <p>
              Access your tasks from any device—be it your mobile, tablet, or
              desktop.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Take Control of Your Tasks Today</h2>
        <p>
          Boost productivity, stay organized, and never miss a deadline again.
          Join TickTask now!
        </p>
        {!isAuthenticated && (
          <button className="cta-btn" onClick={onLogin}>
            Get Started
          </button>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TickTask. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
