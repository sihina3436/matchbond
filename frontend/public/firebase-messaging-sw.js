// public/firebase-messaging-sw.js
// This file MUST be at the root of your public folder
// It handles push notifications when the browser tab is in the background

importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// ⚠️ Hard-code your config here (env vars don't work in service workers)
firebase.initializeApp({
  apiKey: "AIzaSyCJg15aCsw6Lll-v-KVBCktC7MG8-nnhs8",
  authDomain: "theeka-chat.firebaseapp.com",
  projectId: "theeka-chat",
  storageBucket: "theeka-chat.firebasestorage.app",
  messagingSenderId: "175479537787",
  appId: "1:175479537787:web:07239fa1484166409562de",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const { title, body } = payload.notification || {};

  self.registration.showNotification(title || "New Message", {
    body: body || "You have a new message",
    icon: "/logo.png",       // put your app logo here
    badge: "/badge.png",     // small icon shown in notification bar (optional)
    data: payload.data,
    actions: [
      { action: "open", title: "Open Chat" },
      { action: "dismiss", title: "Dismiss" },
    ],
  });
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    event.waitUntil(
      clients.openWindow("/chat") // redirect to chat page on click
    );
  }
});
