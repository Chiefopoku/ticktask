import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  signInWithEmailAndPassword,
  getRedirectResult,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration from environment variables (set these in Vercel → Settings → Environment Variables).
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

let auth;
let db;
let firebaseReady = false;

try {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    throw new Error("Firebase environment variables are missing.");
  }
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  firebaseReady = true;
} catch (err) {
  // Keep the public pages working even if Firebase isn't configured.
  // eslint-disable-next-line no-console
  console.warn("TickTask: Firebase is not configured, sign-in is disabled.", err.message);
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb) => {
      setTimeout(() => cb(null), 0);
      return () => {};
    },
    signOut: async () => {},
  };
  db = null;
}

const safeGetRedirectResult = (a) => (firebaseReady ? getRedirectResult(a) : Promise.resolve(null));

export {
  auth,
  db,
  firebaseReady,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  signInWithEmailAndPassword,
  safeGetRedirectResult as getRedirectResult,
};
