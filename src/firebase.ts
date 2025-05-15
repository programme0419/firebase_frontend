// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;

if (!firebaseConfig) {
    throw new Error("Firebase config is not found");
}

const app = initializeApp(JSON.parse(firebaseConfig));
export const db = getFirestore(app);
