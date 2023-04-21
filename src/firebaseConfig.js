import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA2dFrYZzjv9T1lkj44JuGYIZiNFo3m2SY",

  authDomain: "librarymanagement-cd0b3.firebaseapp.com",

  databaseURL:
    "https://librarymanagement-cd0b3-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "librarymanagement-cd0b3",

  storageBucket: "librarymanagement-cd0b3.appspot.com",

  messagingSenderId: "663520121785",

  appId: "1:663520121785:web:b03ba2ffedc59a75c79c68",

  measurementId: "G-YTGNF5Q6FL",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
