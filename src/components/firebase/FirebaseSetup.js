// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2q5bpFi-8XSpQjYedbk4IO-zpGF-4wfs",
  authDomain: "instagram-clone-2e2bd.firebaseapp.com",
  projectId: "instagram-clone-2e2bd",
  storageBucket: "instagram-clone-2e2bd.appspot.com",
  messagingSenderId: "472607049619",
  appId: "1:472607049619:web:a4992a0f3dc1081e30ca66",
  measurementId: "G-7TFKPJMRHW"
};

// Initialize Firebase
const app           = firebase.initializeApp(firebaseConfig);
const analytics     = getAnalytics(app);
export const auth   = firebase.auth();
export const storage = firebase.storage();
const firestore = firebase.firestore() 
export const database = {
  users: firestore.collection('users'),
  posts:firestore.collection('posts'),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}