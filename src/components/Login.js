import React, { useState } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "../firebase"; // Ensure these Firebase auth methods are imported
import { isMobile } from "react-device-detect"; // Import mobile detection library
import "./Login.css"; // Ensure your CSS is imported

const Login = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle overlay click to close the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Google sign-in with mobile detection logic
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    if (isMobile) {
      signInWithRedirect(auth, provider)
        .then(() => {
          // Redirect and sign in will be handled after the redirect.
        })
        .catch((error) => {
          setError("Failed to sign in with Google. Please try again.");
          console.error("Error during mobile Google login:", error);
        });
    } else {
      signInWithPopup(auth, provider)
        .then((result) => {
          onLogin(result.user);
          onClose();
        })
        .catch((error) => {
          setError("Failed to sign in with Google. Please try again.");
          console.error("Error during desktop Google login:", error);
        });
    }
  };

  // Anonymous login
  const handleAnonymousLogin = () => {
    signInAnonymously(auth)
      .then((result) => {
        onLogin(result.user);
        onClose();
      })
      .catch((error) =>
        setError("Failed to sign in as guest. Please try again.")
      );
  };

  // Email/Password login
  const handleEmailLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        onLogin(result.user);
        onClose();
      })
      .catch((error) => {
        setError(
          "Failed to sign in with email. Please check your credentials."
        );
      });
  };

  return (
    <div className="login-modal-overlay" onClick={handleOverlayClick}>
      <div className="login-modal">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <h1>Welcome to TickTask</h1>
        <p className="login-description">
          Manage your tasks efficiently with TickTask. Sign in to continue.
        </p>

        {/* Google Sign-in Button */}
        <button className="login-button" onClick={handleGoogleLogin}>
          <div className="google-icon">{/* Google SVG */}</div>
          <span>Sign in with Google</span>
        </button>

        {/* Anonymous Sign-in Button */}
        <button
          className="login-button anonymous-login"
          onClick={handleAnonymousLogin}
        >
          Continue as Guest
        </button>

        {/* Error Message Display */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
