import React from "react";
import "./AboutPage.css"; // Importing the CSS for styling

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About TickTask</h1>
        <p className="intro-text">
          TickTask is a powerful and easy-to-use task management app designed to
          help you stay organized, boost productivity, and achieve your goals.
          Whether you're managing daily to-do lists, work projects, or long-term
          plans, TickTask provides the tools you need to stay on top of your
          tasks.
        </p>

        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            Our mission at TickTask is to empower individuals and teams to be
            more productive and organized. We believe that with the right tools,
            anyone can accomplish their tasks efficiently and achieve greater
            success. TickTask was built with simplicity and flexibility in mind,
            allowing users to manage their tasks from anywhere, at any time.
          </p>
        </section>

        <section className="features-section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Task Management:</strong> Create, edit, and organize tasks
              effortlessly.
            </li>
            <li>
              <strong>Reminders & Notifications:</strong> Set reminders for
              tasks and receive notifications so you never miss a deadline.
            </li>
            <li>
              <strong>Google Authentication:</strong> Sign in securely using
              Google to access your tasks from anywhere.
            </li>
            <li>
              <strong>Cross-Platform Access:</strong> Access your tasks on any
              device, be it a desktop or mobile.
            </li>
          </ul>
        </section>

        <section className="community-section">
          <h2>Join Our Community</h2>
          <p>
            At TickTask, we are passionate about building a strong,
            collaborative community of users. Whether you're an individual user
            or part of a team, TickTask is designed to grow with you. We
            actively listen to user feedback and continuously improve our
            platform to meet your needs.
          </p>
        </section>

        <section className="security-section">
          <h2>Security & Privacy</h2>
          <p>
            We take your security seriously. TickTask uses Google authentication
            to ensure that your data is secure. Your information is stored
            safely and is only accessible by you. We follow industry standards
            to protect your data and privacy at all times.
          </p>
        </section>

        <section className="get-started-section">
          <h2>Get Started with TickTask</h2>
          <p>
            Ready to take control of your tasks and achieve more? Join the
            TickTask community today and start organizing your life with ease.
            Whether you're working on personal projects, managing a team, or
            just trying to keep track of daily tasks, TickTask is here to help.
          </p>
          <button className="get-started-btn">Get Started</button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
