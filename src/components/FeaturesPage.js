import React from "react";
import { Link } from "react-router-dom";
import {
  ListIcon,
  CalendarIcon,
  BellIcon,
  FlagIcon,
  SearchIcon,
  ChartIcon,
  SyncIcon,
  ShieldIcon,
  MoonIcon,
} from "./Icons";

const FEATURES = [
  { icon: ListIcon, color: "violet", title: "Fast task capture", text: "Type a task and press Enter. Edit any task inline by double-clicking it." },
  { icon: CalendarIcon, color: "pink", title: "Due dates and times", text: "Tasks due today are highlighted, and overdue ones stand out in red." },
  { icon: BellIcon, color: "amber", title: "Reminders", text: "Get a browser notification at the due time, or 15 minutes, 1 hour or 1 day before." },
  { icon: FlagIcon, color: "pink", title: "Priorities", text: "High, medium and low priority labels, with sorting to bring urgent work to the top." },
  { icon: SearchIcon, color: "blue", title: "Search, filter and sort", text: "Find any task instantly, and switch between all, active, completed and overdue." },
  { icon: ChartIcon, color: "green", title: "Progress at a glance", text: "Live counts for today and overdue tasks, plus a progress ring for the whole list." },
  { icon: SyncIcon, color: "blue", title: "Real-time sync", text: "Tasks are stored in Firebase Firestore and update instantly across your devices." },
  { icon: ShieldIcon, color: "violet", title: "Private by default", text: "Database rules mean only your signed-in account can read or change your tasks." },
  { icon: MoonIcon, color: "slate", title: "Light and dark mode", text: "Follows your system setting, or choose the theme you prefer." },
];

const FeaturesPage = ({ isAuthenticated, onLogin }) => (
  <>
    <div className="container page-head">
      <span className="eyebrow">Features</span>
      <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.8rem)" }}>Small app, serious focus</h1>
      <p>TickTask does a few things very well: capture, plan, remind and finish.</p>
    </div>
    <section style={{ paddingTop: "1rem" }}>
      <div className="container">
        <div className="grid-3">
          {FEATURES.map(({ icon: Icon, color, title, text }) => (
            <article className="card feature-card" key={title}>
              <span className={`tile ${color}`}>
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="cta-band" style={{ marginTop: "3rem" }}>
          <h2>See it for yourself</h2>
          <p>Try TickTask as a guest. No account needed.</p>
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn">
              Open my tasks
            </Link>
          ) : (
            <button type="button" className="btn" onClick={onLogin}>
              Get started
            </button>
          )}
        </div>
      </div>
    </section>
  </>
);

export default FeaturesPage;
