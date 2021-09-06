import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8vSYeJMsQ7f8B8KDhc7rrSLvNfw24R8w",
  authDomain: "blockbuster-451a3.firebaseapp.com",
  projectId: "blockbuster-451a3",
  storageBucket: "blockbuster-451a3.appspot.com",
  messagingSenderId: "297338519452",
  appId: "1:297338519452:web:4ea6e6dd3e113a35a15259",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
