import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./styles/App.css";
import App from "./App";

// Find the root element in your index.html
const container = document.getElementById("root");

// Create a root using the new React 18 API
const root = createRoot(container);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
