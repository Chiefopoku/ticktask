import React from "react";
import "./Login.css";

const Login = () => {
  const googleLogin = () => {
    window.location.href = "http://localhost:8000/accounts/google/login/"; // Django OAuth URL
  };

  return (
    <div className="login-container">
      <h1>Welcome to TickTask</h1>
      <p>Manage your tasks efficiently.</p>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
