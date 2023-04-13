import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD3BUNDvLVxBHSBuWuShcoetm9v-bypPrI",
  authDomain: "carprojet.firebaseapp.com",
  projectId: "carprojet",
  storageBucket: "carprojet.appspot.com",
  messagingSenderId: "287964389755",
  appId: "1:287964389755:web:6641e07575f004e2575dde",
  measurementId: "G-WE6JTC8TLK"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

const firestore = firebase.firestore();


const db = firebase.firestore();
export { firestore, db };