import React, { useState } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
} from "../firebase"; // Firebase auth methods
import { isMobile } from "react-device-detect"; // Mobile detection library
import "./Login.css"; // CSS import

const Login = ({ onLogin, onClose }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // Google sign-in logic
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile"); // Add profile scope
    provider.addScope("email"); // Add email scope

    setLoading(true); // Start loading

    if (isMobile) {
      // Use redirect for Google login on mobile
      signInWithRedirect(auth, provider).catch((error) => {
        setLoading(false); // Stop loading on error
        setError("Failed to sign in with Google on mobile. Please try again.");
        console.error("Mobile Google login error:", error);
      });
    } else {
      // Use popup for Google login on desktop
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;
          console.log("Google Access Token:", token);
          onLogin(user); // Log the user in
          onClose(); // Close the modal after successful login
        })
        .catch((error) => {
          setError("Failed to sign in with Google. Please try again.");
          console.error("Desktop Google login error:", error);
        })
        .finally(() => {
          setLoading(false); // Stop loading after process
        });
    }
  };

  // Handle anonymous login
  const handleAnonymousLogin = () => {
    setLoading(true); // Start loading
    signInAnonymously(auth)
      .then((result) => {
        onLogin(result.user); // Log the user in
        onClose(); // Close the modal after successful login
      })
      .catch((error) => {
        setError("Failed to sign in as guest. Please try again.");
        console.error("Anonymous login error:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loading after process
      });
  };

  return (
    <div
      className="login-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="login-modal">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <h1>Welcome to TickTask</h1>
        <p className="login-description">
          Manage your tasks efficiently with TickTask. Sign in to continue.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Google Sign-in Button */}
            <button
              className="login-button google-login"
              onClick={handleGoogleLogin}
            >
              {/* Google Icon SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                {/* SVG paths */}
              </svg>
              Sign in with Google
            </button>

            {/* Anonymous Sign-in Button */}
            <button
              className="login-button anonymous-login"
              onClick={handleAnonymousLogin}
            >
              Continue as Guest
            </button>
          </>
        )}

        {/* Error Message Display */}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
