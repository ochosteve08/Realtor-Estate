// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYdpr0wFR0JqtCehQ8pWdF6dGghbPs-lU",
  authDomain: "realtor-estate.firebaseapp.com",
  projectId: "realtor-estate",
  storageBucket: "realtor-estate.appspot.com",
  messagingSenderId: "371834643133",
  appId: "1:371834643133:web:a02e41a27ff7a6c8e90dd4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;