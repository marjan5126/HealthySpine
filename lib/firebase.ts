import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGVzgnkicPwXJgiHMmKTqPJEanjnYfn-k",
  authDomain: "healthyspine-7e8d4.firebaseapp.com",
  projectId: "healthyspine-7e8d4",
  storageBucket: "healthyspine-7e8d4.firebasestorage.app",
  messagingSenderId: "142814791905",
  appId: "1:142814791905:web:6c3e4bfaa3dc8a44034fa0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Export both app and auth for use in other components
export { app, auth, createUserWithEmailAndPassword, signInWithGoogle };
