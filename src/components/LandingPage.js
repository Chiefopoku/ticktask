import React from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  CalendarIcon,
  BellIcon,
  FlagIcon,
  SyncIcon,
  ChartIcon,
  ShieldIcon,
  ListIcon,
  UserIcon,
} from "./Icons";

const PreviewRow = ({ done, text, pill, pillClass }) => (
  <div className={`preview-row ${done ? "done" : ""}`}>
    <span className="fake-check">{done && <CheckIcon />}</span>
    <span className="t">{text}</span>
    <span className={`pill ${pillClass}`}>{pill}</span>
  </div>
);

const LandingPage = ({ isAuthenticated, onLogin }) => {
  const PrimaryCta = ({ children }) =>
    isAuthenticated ? (
      <Link to="/dashboard" className="btn">
        Open my tasks
      </Link>
    ) : (
      <button type="button" className="btn" onClick={onLogin}>
        {children}
      </button>
    );

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Simple task management</span>
            <h1>
              Plan less. <span className="grad-text">Tick more.</span>
            </h1>
            <p className="lead">
              TickTask keeps your to-dos, deadlines and priorities in one clean list, with
              reminders that nudge you before things slip.
            </p>
            <div className="hero-ctas">
              <PrimaryCta>Get started free</PrimaryCta>
              <Link to="/features" className="btn btn-ghost">
                See features
              </Link>
            </div>
            <ul className="hero-points">
              <li>
                <CheckIcon /> Free to use
              </li>
              <li>
                <ShieldIcon /> Sign in with Google
              </li>
              <li>
                <SyncIcon /> Syncs in real time
              </li>
            </ul>
          </div>

          <div className="preview" aria-hidden="true">
            <div className="preview-head">
              <div>
                <small className="muted">Today</small>
                <br />
                <strong>4 tasks &middot; 2 done</strong>
              </div>
              <div className="ring" style={{ "--p": 50 }}>
                <span>50%</span>
              </div>
            </div>
            <PreviewRow done text="Submit lab report" pill="High" pillClass="high" />
            <PreviewRow done text="Reply to advisor" pill="Medium" pillClass="medium" />
            <PreviewRow text="Book flight home" pill="Due today" pillClass="today" />
            <PreviewRow text="Read two papers" pill="Low" pillClass="low" />
            <div className="float-chip">
              <span className="tile sm violet">
                <BellIcon />
              </span>
              <div>
                <strong>Reminder: Book flight home</strong>
                <br />
                <small className="muted">Due in 1 hour</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Why TickTask</span>
            <h2>Everything you need to stay on top of things</h2>
            <p>No clutter, no learning curve. Just the tools that help you finish.</p>
          </div>
          <div className="grid-3">
            <article className="card feature-card">
              <span className="tile violet">
                <ListIcon />
              </span>
              <h3>Quick capture</h3>
              <p>Add a task in seconds, then edit it inline whenever plans change.</p>
            </article>
            <article className="card feature-card">
              <span className="tile pink">
                <CalendarIcon />
              </span>
              <h3>Due dates and reminders</h3>
              <p>Set a date and time, and get a browser notification before it is due.</p>
            </article>
            <article className="card feature-card">
              <span className="tile amber">
                <FlagIcon />
              </span>
              <h3>Priorities that matter</h3>
              <p>Mark tasks high, medium or low, and sort so the important ones rise to the top.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="alt-bg">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to a calmer day</h2>
          </div>
          <div className="grid-3 steps">
            <article className="card step">
              <span className="tile violet">
                <UserIcon />
              </span>
              <h3>Sign in</h3>
              <p>Use your Google account, or try it instantly as a guest.</p>
            </article>
            <article className="card step">
              <span className="tile pink">
                <ListIcon />
              </span>
              <h3>Add your tasks</h3>
              <p>Give each one a due date, a priority and an optional reminder.</p>
            </article>
            <article className="card step">
              <span className="tile green">
                <ChartIcon />
              </span>
              <h3>Tick them off</h3>
              <p>Watch your progress ring fill up as you work through the list.</p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-band">
            <h2>Ready to get organised?</h2>
            <p>It takes less than a minute to set up.</p>
            <PrimaryCta>Start for free</PrimaryCta>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
