import React from "react";
import { CodeIcon, ShieldIcon, SyncIcon, UserIcon, GithubIcon } from "./Icons";

const STACK = ["React 18", "React Router", "Firebase Authentication", "Cloud Firestore", "Notifications API", "Vercel"];

const AboutPage = () => (
  <>
    <div className="container page-head">
      <span className="eyebrow">About</span>
      <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>Built to keep things simple</h1>
      <p>
        TickTask is a lightweight task manager for anyone who wants a clear list, sensible
        reminders and nothing in the way.
      </p>
    </div>

    <section style={{ paddingTop: "1rem" }}>
      <div className="container split">
        <article className="card">
          <h2 style={{ fontSize: "1.4rem" }}>Why I built it</h2>
          <p className="muted">
            Most task apps try to do everything. I wanted one that does the basics well: capture a
            task quickly, give it a date and a priority, get reminded, and tick it off. TickTask is
            the result, and a project for practising modern React with a real-time cloud back-end.
          </p>
          <h3 style={{ marginTop: "1.6rem" }}>How it works</h3>
          <ul className="stack-list">
            <li>
              <span className="tile sm violet">
                <UserIcon />
              </span>
              <p>
                <strong>Sign-in</strong> uses Firebase Authentication with Google, or an anonymous
                guest account for trying it out.
              </p>
            </li>
            <li>
              <span className="tile sm blue">
                <SyncIcon />
              </span>
              <p>
                <strong>Tasks</strong> live in Cloud Firestore and stream to the app in real time,
                so changes appear instantly on every device.
              </p>
            </li>
            <li>
              <span className="tile sm green">
                <ShieldIcon />
              </span>
              <p>
                <strong>Privacy:</strong> Firestore security rules allow each account to read and
                write only its own tasks. TickTask does not sell or share data.
              </p>
            </li>
          </ul>
        </article>

        <aside className="card">
          <span className="tile pink">
            <CodeIcon />
          </span>
          <h3 style={{ marginTop: "1rem" }}>Built with</h3>
          <div className="chips" style={{ marginBottom: "1.4rem" }}>
            {STACK.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
          <h3>Developer</h3>
          <p className="muted" style={{ fontSize: "0.92rem" }}>
            Designed and built by Emmanuel Opoku-Adjei.
          </p>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <a
              className="btn btn-ghost btn-sm"
              href="https://github.com/Chiefopoku/ticktask"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon width="16" height="16" /> Source code
            </a>
            <a
              className="btn btn-ghost btn-sm"
              href="https://chiefopoku.github.io/portfolio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </div>
        </aside>
      </div>
    </section>
  </>
);

export default AboutPage;
