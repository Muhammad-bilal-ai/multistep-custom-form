// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUM-BifSS6HluYYwAn6Yp1ZuQOaFxJuJ0",
  authDomain: "multistepform-3c227.firebaseapp.com",
  projectId: "multistepform-3c227",
  storageBucket: "multistepform-3c227.appspot.com",
  messagingSenderId: "132740633955",
  appId: "1:132740633955:web:f95d2d701784b6344aef56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { doc, setDoc } from "firebase/firestore";

export const saveFormData = async (values) => {
  console.log("values at saving form data: " + JSON.stringify(values));
  try {
    const docRef = doc(collection(db, "multistepform"));
    await setDoc(docRef, values);
  } catch (error) {
    console.log("error at saving form data: " + JSON.stringify(error));
    throw error;
  }
};
