// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "realtimechat-2d952.firebaseapp.com",
  projectId: "realtimechat-2d952",
  storageBucket: "realtimechat-2d952.firebasestorage.app",
  messagingSenderId: "314085010385",
  appId: "1:314085010385:web:a32fc9284d1340e1118ef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
