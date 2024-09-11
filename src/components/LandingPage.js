import React from "react";
import "./LandingPage.css";

const LandingPage = ({ isAuthenticated, onLogin, theme, toggleTheme }) => {
  return (
    <div className={`landing-page ${theme}`}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Organize. Achieve. Succeed.</h1>
          <p className="hero-subtext">
            Simplify your life and increase your productivity with TickTask.
            Your tasks, deadlines, and goals — all in one place.
          </p>
          {!isAuthenticated && (
            <button className="cta-btn hero-btn" onClick={onLogin}>
              Get Started for Free
            </button>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Start Managing Your Tasks Like a Pro</h2>
        <p className="cta-text">
          Boost productivity, stay organized, and never miss a deadline again.
          Join TickTask now!
        </p>
        {!isAuthenticated && (
          <button className="cta-btn" onClick={onLogin}>
            Join Now
          </button>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 TickTask. All rights reserved.</p>
        <p>
          <a href="/about">About</a> | <a href="/features">Features</a> |{" "}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
