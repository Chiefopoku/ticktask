import React from "react";
import { Navigate } from "react-router-dom";

// Waits for Firebase to restore the session before redirecting,
// so refreshing /dashboard no longer bounces signed-in users to the home page.
const PrivateRoute = ({ user, authReady, children }) => {
  if (!authReady) return <div className="spinner" role="status" aria-label="Loading" />;
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
