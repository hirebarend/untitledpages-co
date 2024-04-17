import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

export const FIREBASE_APP = initializeApp({
  apiKey: "AIzaSyB2Fxjj1K3uxxR7wpSg6gmFHk66DBcOIBw",
  authDomain: "link-bird-e2107.firebaseapp.com",
  projectId: "link-bird-e2107",
  storageBucket: "link-bird-e2107.appspot.com",
  messagingSenderId: "262698488942",
  appId: "1:262698488942:web:06b70881307836c919827f"
});

export const FIRESTORE = getFirestore(FIREBASE_APP);
