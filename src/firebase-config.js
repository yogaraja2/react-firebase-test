import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmEw_lbaptrnfdbqiK-uo4KpVtL4t_6yk",
  authDomain: "react-firebase-test-f7b60.firebaseapp.com",
  projectId: "react-firebase-test-f7b60",
  storageBucket: "react-firebase-test-f7b60.appspot.com",
  messagingSenderId: "880307178390",
  appId: "1:880307178390:web:65ad2951dd89571a4febb7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connecting FireStore
export const db = getFirestore(app);

// Google Auth Provider
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);
