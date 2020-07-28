import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

// ADD YOUR FIREBASE CONFIG OBJECT HERE:
const firebaseConfig = {
  apiKey: "AIzaSyA9vXH-p9pwT6fBY63UGJJ2kzDWqMb1L1E",
  authDomain: "coderlust-todo.firebaseapp.com",
  databaseURL: "https://coderlust-todo.firebaseio.com",
  projectId: "coderlust-todo",
  storageBucket: "coderlust-todo.appspot.com",
  messagingSenderId: "847959317298",
  appId: "1:847959317298:web:dc9fbe300441b93992952b"
}

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }