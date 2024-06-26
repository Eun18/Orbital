import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBNTmjnSjVH-QCgSi-F7Fu3KHdFje0dT-w",
  authDomain: "thirdproj-98a26.firebaseapp.com",
  projectId: "thirdproj-98a26",
  storageBucket: "thirdproj-98a26.appspot.com",
  messagingSenderId: "101745297294",
  appId: "1:101745297294:web:c6ce95655eb477a9e3c6df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);