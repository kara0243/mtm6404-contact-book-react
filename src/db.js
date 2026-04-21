import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaQG1aGP7LP-4xZli-5UOMir8O4LUA8Gg",
  authDomain: "contact-book-kara0243.firebaseapp.com",
  projectId: "contact-book-kara0243",
  storageBucket: "contact-book-kara0243.firebasestorage.app",
  messagingSenderId: "733561247556",
  appId: "1:733561247556:web:3cd850c81e60882941e911",
  measurementId: "G-YBJK92FKGT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);