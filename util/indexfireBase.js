// Import the functions you need from the SDKs you need
// import "regenerator-runtime/runtime";
import * as firebase from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj1tAK9yI-41jhMWukv0-h4MsZN9ssa5E",
  authDomain: "task-app-eb3cf.firebaseapp.com",
  databaseURL: "https://task-app-eb3cf-default-rtdb.firebaseio.com",
  projectId: "task-app-eb3cf",
  storageBucket: "task-app-eb3cf.appspot.com",
  messagingSenderId: "758729008714",
  appId: "1:758729008714:web:ecbb0033b4e1cdc0d4e8b3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

//exporter notre base de données
export default app;
//export the auth app
