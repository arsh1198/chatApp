import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA3MM0UvGN43Ujnne8dM-KaMo4CD_3k3gs",
  authDomain: "chatapp-91deb.firebaseapp.com",
  projectId: "chatapp-91deb",
  storageBucket: "chatapp-91deb.appspot.com",
  messagingSenderId: "1042544814126",
  appId: "1:1042544814126:web:c9c469c214ea63877d57bf",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase;
