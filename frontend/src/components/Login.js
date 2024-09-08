import React from "react";

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <h1>Welcome to TickTask</h1>
      <button onClick={onLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
