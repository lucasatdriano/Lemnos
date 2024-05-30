import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAzHbzF7okGZfDPfUGHWnlNr6UUborXkrY",
  authDomain: "lemnos-79d4b.firebaseapp.com",
  projectId: "lemnos-79d4b",
  storageBucket: "lemnos-79d4b.appspot.com",
  messagingSenderId: "1059469857481",
  appId: "1:1059469857481:web:acd19976a63c1939e37318",
  measurementId: "G-LQP4JLB1KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth instance
const auth = getAuth(app);

// Setup providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };