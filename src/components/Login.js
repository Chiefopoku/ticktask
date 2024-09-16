import React, { useState, useEffect } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  getRedirectResult,
} from "../firebase"; // Firebase auth methods
import { isMobile } from "react-device-detect"; // Mobile detection library
import "./Login.css"; // CSS import

const Login = ({ onLogin, onClose }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check if the user is returning from Google sign-in redirect on mobile
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          onLogin(result.user);
          onClose(); // Close the modal after successful login
        }
      } catch (error) {
        setError(
          "Failed to complete Google sign-in redirect. Please try again."
        );
        console.error("Error during Google sign-in redirect:", error);
      } finally {
        setLoading(false); // Stop loading after checking
      }
    };

    // If on mobile, check for redirect result
    if (isMobile) {
      checkRedirectResult();
    } else {
      setLoading(false); // No need to check redirect result on non-mobile
    }
  }, [onLogin, onClose]);

  // Google sign-in with mobile detection
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();

    if (isMobile) {
      // Use redirect for Google login on mobile
      signInWithRedirect(auth, provider).catch((error) => {
        setError("Failed to sign in with Google on mobile. Please try again.");
        console.error("Mobile Google login error:", error);
      });
    } else {
      // Use popup for Google login on desktop
      signInWithPopup(auth, provider)
        .then((result) => {
          onLogin(result.user);
          onClose(); // Close the modal after successful login
        })
        .catch((error) => {
          setError("Failed to sign in with Google. Please try again.");
          console.error("Desktop Google login error:", error);
        });
    }
  };

  // Handle anonymous login
  const handleAnonymousLogin = () => {
    signInAnonymously(auth)
      .then((result) => {
        onLogin(result.user);
        onClose(); // Close the modal after successful login
      })
      .catch((error) => {
        setError("Failed to sign in as guest. Please try again.");
        console.error("Anonymous login error:", error);
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

        {/* Loading state */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Google Sign-in Button */}
            <button
              className="login-button google-login"
              onClick={handleGoogleLogin}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12 0-6.627 5.373-12 12-12 3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24c0 11.045 8.955 20 20 20 11.045 0 20-8.955 20-20 0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
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
