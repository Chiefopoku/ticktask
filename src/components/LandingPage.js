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

      {/* Review Section */}
      <section className="review-section">
        <h2>What Our Users Say</h2>
        <div className="reviews-container">
          <div className="review">
            <p className="review-text">
              "TickTask has completely transformed how I organize my daily
              tasks. I can't imagine life without it!"
            </p>
            <p className="review-author">— Jane Doe</p>
          </div>

          <div className="review">
            <p className="review-text">
              "The perfect tool for managing both my personal and work projects.
              Simple, yet powerful!"
            </p>
            <p className="review-author">— John Smith</p>
          </div>

          <div className="review">
            <p className="review-text">
              "I love how intuitive the interface is. It has made staying on top
              of my tasks so much easier!"
            </p>
            <p className="review-author">— Emily Johnson</p>
          </div>
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
