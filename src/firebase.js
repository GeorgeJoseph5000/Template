import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB7lyEspfetQfZbvtykn9urxWOhVFmh9Mg",
    authDomain: "copticholybible.firebaseapp.com",
    projectId: "copticholybible",
    storageBucket: "copticholybible.appspot.com",
    messagingSenderId: "966592209369",
    appId: "1:966592209369:web:528a585d60a6fbc49af9c8",
    measurementId: "G-ZFMGLSB72F"
});

const auth = firebaseApp.auth()
const db = firebaseApp.firestore()
const storage = firebaseApp.storage()

export { auth, db, storage }