// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_2kv4plQXsi_eftZcihhywv6msdZhdM4",
    authDomain: "fabula-e9d7e.firebaseapp.com",
    projectId: "fabula-e9d7e",
    storageBucket: "fabula-e9d7e.firebasestorage.app",
    messagingSenderId: "296753282882",
    appId: "1:296753282882:web:a824ee7c48d116cc3892db",
    measurementId: "G-MGW3LP57MJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);

// Set default persistence to session (will be changed based on "Remember Me")
if (typeof window !== 'undefined') {
    setPersistence(auth, browserSessionPersistence).catch((error) => {
        console.error('Error setting persistence:', error);
    });
}

export { app, analytics, db, auth, storage, setPersistence, browserLocalPersistence, browserSessionPersistence };
