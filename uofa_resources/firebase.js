// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHrAS6i2-L0E0WFmQGrj5SGS9LRley878",
  authDomain: "uofa-resources.firebaseapp.com",
  projectId: "uofa-resources",
  storageBucket: "uofa-resources.appspot.com",
  messagingSenderId: "74396974548",
  appId: "1:74396974548:web:f72352c993ab0bb699aa41",
  measurementId: "G-E8DPGS25PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/*const analytics = getAnalytics(app);*/
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };