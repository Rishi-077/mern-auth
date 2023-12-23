import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-b776f.firebaseapp.com",
  projectId: "mern-auth-b776f",
  storageBucket: "mern-auth-b776f.appspot.com",
  messagingSenderId: "250806630397",
  appId: "1:250806630397:web:4ccef8cbc1866aeb510b94",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
