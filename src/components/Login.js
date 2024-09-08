import React from "react";
import "./Login.css"; // Import the CSS file for styling

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to TickTask</h1>
        <p className="login-description">
          Manage your tasks efficiently with TickTask. Sign in to continue.
        </p>
        <button className="login-button" onClick={onLogin}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google Logo"
            className="google-logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
