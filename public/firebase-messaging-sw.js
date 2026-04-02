// public/firebase-messaging-sw.js
// ─────────────────────────────────────────────────────────────────────────────
// SETUP: Replace every REPLACE_WITH_... value below with your actual Firebase
// project config values. These are safe to expose — they are public identifiers.
// Get them from: Firebase Console → Project Settings → General → Your apps
// ─────────────────────────────────────────────────────────────────────────────

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:            "REPLACE_WITH_VITE_FIREBASE_API_KEY",
  authDomain:        "REPLACE_WITH_VITE_FIREBASE_AUTH_DOMAIN",
  projectId:         "REPLACE_WITH_VITE_FIREBASE_PROJECT_ID",
  storageBucket:     "REPLACE_WITH_VITE_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "REPLACE_WITH_VITE_FIREBASE_MESSAGING_SENDER_ID",
  appId:             "REPLACE_WITH_VITE_FIREBASE_APP_ID",
});

const messaging = firebase.messaging();

// Handle messages received while the app is in the background or closed
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification ?? {};

  self.registration.showNotification(title ?? "New message", {
    body:  body ?? "",
    icon:  "/logo.png",
    badge: "/badge.png",
    data:  payload.data ?? {},
    vibrate: [200, 100, 200],
  });
});
