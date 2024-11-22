// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.Firebase_API_KEY,
  authDomain: "sih-2024-502a0.firebaseapp.com",
  databaseURL: "https://sih-2024-502a0-default-rtdb.firebaseio.com",
  projectId: "sih-2024-502a0",
  storageBucket: "sih-2024-502a0.appspot.com",
  messagingSenderId: "395736224909",
  appId: "1:395736224909:web:4bc50cf5ddaef27a13fec4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
