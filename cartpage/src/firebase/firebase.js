// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "beshilo-store.firebaseapp.com",
  projectId: "beshilo-store",
  storageBucket: "beshilo-store.firebasestorage.app",
  messagingSenderId: "596584960604",
  appId: "1:596584960604:web:a9a9c43ac105f1e5034c99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) //for user signup/login
export const db = getFirestore(app) //for database (cart/product)
