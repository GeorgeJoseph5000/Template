import firebase from "firebase";


const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyA9ulPLTa4O4XFVI2zHm51V-8UPdJrSPxk",
  authDomain: "template-29050.firebaseapp.com",
  projectId: "template-29050",
  storageBucket: "template-29050.appspot.com",
  messagingSenderId: "780625786954",
  appId: "1:780625786954:web:3864d6f83f79fa5c5d8eb3",
  measurementId: "G-S3WGH3XH83"
});

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

export { auth, db, storage }
