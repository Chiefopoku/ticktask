import React from "react";
import "./FeaturesPage.css"; // Import the CSS for styling

const FeaturesPage = () => {
  return (
    <div className="features-page">
      <header className="features-header">
        <h1>Features of TickTask</h1>
        <p>
          TickTask offers an array of features designed to help you organize,
          prioritize, and complete tasks effortlessly. Whether you're managing
          personal to-do lists or professional projects, TickTask has you
          covered.
        </p>
      </header>

      <section className="features-list">
        <div className="feature-item">
          <img
            src="https://img.icons8.com/fluent/96/checklist.png"
            alt="Task Management"
          />
          <h2>Task Management</h2>
          <p>
            Effortlessly create, organize, and manage your tasks with an
            intuitive interface. Set priorities, break tasks into sub-tasks, and
            track your progress.
          </p>
        </div>

        <div className="feature-item">
          <img
            src="https://img.icons8.com/fluent/96/alarm.png"
            alt="Reminders"
          />
          <h2>Task Reminders</h2>
          <p>
            Never miss a deadline with built-in reminders. Get notified on time
            to ensure all your tasks are completed on schedule.
          </p>
        </div>

        <div className="feature-item">
          <img
            src="https://img.icons8.com/fluent/96/google-logo.png"
            alt="Google Authentication"
          />
          <h2>Google Authentication</h2>
          <p>
            Sign in securely using your Google account and access your tasks
            from anywhere, on any device.
          </p>
        </div>

        <div className="feature-item">
          <img
            src="https://img.icons8.com/fluent/96/synchronize.png"
            alt="Cross-Platform Access"
          />
          <h2>Cross-Platform Access</h2>
          <p>
            Access your tasks seamlessly from any device—desktop, mobile, or
            tablet—and sync your data across platforms.
          </p>
        </div>

        <div className="feature-item">
          <img
            src="https://img.icons8.com/fluent/96/sun--v1.png"
            alt="Light and Dark Modes"
          />
          <h2>Customizable Themes</h2>
          <p>
            Choose between light and dark themes to suit your style and enhance
            your productivity.
          </p>
        </div>

        <div className="feature-item">
          <img
            src="https://img.icons8.com/color/96/lock.png"
            alt="Secure Data"
          />
          <h2>Secure Data</h2>
          <p>
            Your data is encrypted and securely stored to ensure privacy and
            protection.
          </p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
