import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  firebaseReady,
} from "../firebase";
import { LogoIcon, GoogleIcon, UserIcon, CloseIcon } from "./Icons";

const POPUP_FALLBACK = new Set([
  "auth/popup-blocked",
  "auth/operation-not-supported-in-this-environment",
  "auth/web-storage-unsupported",
]);

const friendly = (code) => {
  if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
    return "Sign-in was cancelled.";
  }
  if (code === "auth/network-request-failed") return "Network error. Check your connection and try again.";
  if (code === "auth/admin-restricted-operation") return "Guest access is currently disabled.";
  return "Something went wrong signing you in. Please try again.";
};

const Login = ({ onSignedIn, onClose }) => {
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(null); // "google" | "guest" | null

  const notConfigured = () => {
    setError("Sign-in is temporarily unavailable. Please try again later.");
  };

  const handleGoogle = async () => {
    if (!firebaseReady) {
      notConfigured();
      return;
    }
    setError(null);
    setBusy("google");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
        return;
      }
      await signInWithPopup(auth, provider);
      onSignedIn();
    } catch (err) {
      if (POPUP_FALLBACK.has(err.code)) {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (redirectErr) {
          setError(friendly(redirectErr.code));
          return;
        }
      }
      setError(friendly(err.code));
    } finally {
      setBusy(null);
    }
  };

  const handleGuest = async () => {
    if (!firebaseReady) {
      notConfigured();
      return;
    }
    setError(null);
    setBusy("guest");
    try {
      await signInAnonymously(auth);
      onSignedIn();
    } catch (err) {
      setError(friendly(err.code));
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="card login-card" role="dialog" aria-modal="true" aria-labelledby="login-title">
      {onClose && (
        <button type="button" className="icon-btn close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
      )}
      <span className="brand-mark">
        <LogoIcon />
      </span>
      <h2 id="login-title">Welcome to TickTask</h2>
      <p>Sign in to plan your day and keep your tasks in sync.</p>

      <button
        type="button"
        className="btn google-btn btn-block"
        onClick={handleGoogle}
        disabled={!!busy}
      >
        <GoogleIcon width="20" height="20" />
        {busy === "google" ? "Signing in…" : "Continue with Google"}
      </button>

      <div className="divider">or</div>

      <button
        type="button"
        className="btn btn-ghost btn-block"
        onClick={handleGuest}
        disabled={!!busy}
      >
        <UserIcon />
        {busy === "guest" ? "Starting…" : "Try it as a guest"}
      </button>

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <p className="fine">
        Guest tasks are tied to this browser. Use Google to access your tasks on any device.
      </p>
    </div>
  );
};

export default Login;
