import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  // use your own creds, I've deleted this haha!
  apiKey: "AIzaSyBndnzAvFfYzWcEq85n_lW-fAXxa0mp1lQ",
  authDomain: "autoform-361ed.firebaseapp.com",
  databaseURL: "https://autoform-361ed.firebaseio.com",
  projectId: "autoform-361ed",
  storageBucket: "autoform-361ed.appspot.com",
  messagingSenderId: "258218298635",
  appId: "1:258218298635:web:e366ecffaa8f39ddde660e"
});

const db = firebaseApp.firestore();

export { db };
