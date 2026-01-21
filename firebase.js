// -----------------------------------------------------------------------------
// FIREBASE.JS
// Purpose: Single shared backend connector for the entire system.
// Responsibilities: Init App, Init Auth, Init Firestore, Expose Shared Instances.
// -----------------------------------------------------------------------------

// Import the functions you need from the SDKs
// NOTE: If using a bundler (Vite/Webpack), keep these imports.
// If using plain HTML <script type="module">, you may need to use CDN URLs or an import map.
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// -----------------------------------------------------------------------------
// 1. FIREBASE APP CONFIGURATION
// Source: Firebase Console -> Project Settings -> General -> Your apps
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCcOB_fKLAdZsY0XGbgW0UBanTFt2i99SU",
  authDomain: "campusresolve-e70f3.firebaseapp.com",
  projectId: "campusresolve-e70f3",
  storageBucket: "campusresolve-e70f3.firebasestorage.app",
  messagingSenderId: "855817035582",
  appId: "1:855817035582:web:76105fc5b4088fe366966f"
};

// -----------------------------------------------------------------------------
// 2. FIREBASE SERVICES INITIALIZATION (Singletons)
// -----------------------------------------------------------------------------

// Initialize the main application instance
const app = initializeApp(firebaseConfig);

// Initialize Authentication
// Usage: Used for login, registration, and checking current user status
const auth = getAuth(app);

// Initialize Firestore Database
// Usage: Used for all data storage (complaints, user profiles)
const db = getFirestore(app);

// -----------------------------------------------------------------------------
// 3. UTILITY EXPORTS & HELPERS
// -----------------------------------------------------------------------------

/**
 * Centralized Auth State Listener
 * Wraps the Firebase onAuthStateChanged method.
 * @param {Function} callback - Function to execute when auth state changes (receives user object or null)
 * @returns {Function} - Unsubscribe function
 */
const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    // We can add global logging or logic here if needed in the future
    callback(user);
  });
};

/**
 * Standard Logout Function
 * Ensures consistent logout behavior across the app.
 */
const logoutUser = async () => {
  try {
    await signOut(auth);
    // Note: Redirection happens in the UI layer (the calling page), not here.
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// -----------------------------------------------------------------------------
// 4. EXPORTS
// Each page imports these instead of initializing Firebase again.
// -----------------------------------------------------------------------------
export { 
  app, 
  auth, 
  db, 
  subscribeToAuthChanges, 
  logoutUser 
};