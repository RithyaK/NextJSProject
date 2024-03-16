// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsy2boAttVHZ4jEzpiyz6It74JpJwLmVU",
  authDomain: "next-js-project1-e5b85.firebaseapp.com",
  projectId: "next-js-project1-e5b85",
  storageBucket: "next-js-project1-e5b85.appspot.com",
  messagingSenderId: "983918471768",
  appId: "1:983918471768:web:5014e7541f6d1f26a1f82d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
