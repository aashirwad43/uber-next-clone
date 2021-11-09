// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo3iL7gQJn2KFKEPJuA5903c_sLEhxR1A",
  authDomain: "uber-next-clone-122b4.firebaseapp.com",
  projectId: "uber-next-clone-122b4",
  storageBucket: "uber-next-clone-122b4.appspot.com",
  messagingSenderId: "760157841131",
  appId: "1:760157841131:web:17d41e0afc530f664ec0ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = new getAuth();

export { app, provider, auth };
