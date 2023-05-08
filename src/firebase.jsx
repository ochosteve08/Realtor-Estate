
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'




// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAYdpr0wFR0JqtCehQ8pWdF6dGghbPs-lU",
//   authDomain: "realtor-estate.firebaseapp.com",
//   projectId: "realtor-estate",
//   storageBucket: "realtor-estate.appspot.com",
//   messagingSenderId: "371834643133",
//   appId: "1:371834643133:web:a02e41a27ff7a6c8e90dd4",
// };

// second database
// const firebaseConfig = {
//   apiKey: "AIzaSyD1qJ1HZJuQT9WxsMQLZBafetfO-lqDt5E",
//   authDomain: "estate-f20ed.firebaseapp.com",
//   projectId: "estate-f20ed",
//   storageBucket: "estate-f20ed.appspot.com",
//   messagingSenderId: "767833132935",
//   appId: "1:767833132935:web:29ea7f9e8d18e422e74d22",
//   measurementId: "G-LTG175R6PK",
// };

// new google account
const firebaseConfig = {
  apiKey: "AIzaSyDFNI3oR_rUN9hkpHZjZMd0VCx0Sjsg0VI",
  authDomain: "estate-88ef7.firebaseapp.com",
  projectId: "estate-88ef7",
  storageBucket: "estate-88ef7.appspot.com",
  messagingSenderId: "780396156583",
  appId: "1:780396156583:web:8bed4742c446ee508b6d82",
  measurementId: "G-RP3EL0C8GB",
};






// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;