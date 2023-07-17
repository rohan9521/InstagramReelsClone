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
