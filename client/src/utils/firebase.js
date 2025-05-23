import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "task-management-system-d-c69e9.firebaseapp.com",
  projectId: "task-management-system-d-c69e9",
  storageBucket: "task-management-system-d-c69e9.firebasestorage.app",
  messagingSenderId: "206523969305",
  appId: "1:206523969305:web:ed7b075f51f9f0809e1f88",
};

export const app = initializeApp(firebaseConfig);
