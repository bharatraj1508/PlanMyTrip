// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ2X-L3dNPKo0sHwIF3Wal1BgU1EVZYo8",
  authDomain: "learning-cb34e.firebaseapp.com",
  projectId: "learning-cb34e",
  storageBucket: "learning-cb34e.firebasestorage.app",
  messagingSenderId: "464829816256",
  appId: "1:464829816256:web:1c3cc9f4159787d37abc25",
  measurementId: "G-TVTFBFVT2W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
