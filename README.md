# TickTask

**Live app:** https://ticktask-six.vercel.app/

TickTask is a simple, fast task manager.

- Add tasks with due dates, priorities and reminders.
- Search, filter and sort them.
- Track your progress.

Everything syncs in real time with Firebase.

## Features

- **Sign-in:** Google sign-in, or try it instantly as a guest (Firebase Authentication).
- **Tasks:** quick capture, inline rename (double-click), complete and delete, and clear all completed tasks.
- **Due dates and priorities:** optional date and time, plus a High, Medium or Low priority. "Today" and "Overdue" are highlighted.
- **Reminders:** a browser notification at the due time, or 15 minutes, 1 hour or 1 day before. These fire while the app is open.
- **Search, filter and sort:** filter by all, active, done or overdue, and sort by due date, priority or newest.
- **Dashboard stats:** total, done, due today, overdue, and a progress ring.
- **Real-time sync:** tasks are stored in Cloud Firestore and update instantly across devices.
- **Light and dark mode:** follows your system setting and remembers your choice.
- **Responsive and accessible:** keyboard-friendly, with labelled controls and support for reduced motion.

## Tech stack

- React 18 and React Router 6 (Create React App)
- Firebase Authentication (Google and anonymous sign-in)
- Cloud Firestore
- Plain CSS design system with CSS variables (`src/styles/global.css`)
- Deployed on Vercel. `vercel.json` rewrites all routes to `index.html`, so deep links such as `/dashboard` work on refresh.

## Project structure

```
src/
  App.js                 routes, auth state, theme, login modal
  firebase.js            Firebase initialisation (config from env vars)
  styles/global.css      design system
  components/
    Header.js, Footer.js
    LandingPage.js, FeaturesPage.js, AboutPage.js
    Login.js             Google and guest sign-in
    PrivateRoute.js      waits for auth before redirecting
    Dashboard.js         stats, filters, search, sort, reminders
    TaskInput.js, TaskList.js, TaskItem.js
    taskUtils.js         date, priority and sorting helpers
    Icons.js             inline SVG icons
```

## Getting started

1. Clone the repo and install the dependencies:

   ```bash
   git clone https://github.com/Chiefopoku/ticktask.git
   cd ticktask
   npm install
   ```

2. Create a Firebase project and enable **Authentication**, with the **Google** and **Anonymous** providers turned on.
3. Enable **Cloud Firestore** in the same project.
4. Add a `.env` file in the project root:

   ```bash
   REACT_APP_FIREBASE_API_KEY=...
   REACT_APP_FIREBASE_AUTH_DOMAIN=...
   REACT_APP_FIREBASE_PROJECT_ID=...
   REACT_APP_FIREBASE_STORAGE_BUCKET=...
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
   REACT_APP_FIREBASE_APP_ID=...
   ```

5. Start the app with `npm start`. It opens at http://localhost:3000.

## Firestore security rules

These rules allow each signed-in user to read and write only their own tasks:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## Task document shape

```js
{
  name: "Submit report",
  completed: false,
  userId: "<firebase uid>",
  createdAt: <server timestamp>,
  dueDate: "2026-10-14" | null,
  dueTime: "17:00" | null,
  priority: "high" | "medium" | "low",
  reminder: "<ISO datetime>" | null
}
```

## Author

Built by [Emmanuel Opoku-Adjei](https://chiefopoku.github.io/portfolio/). MIT licence.
