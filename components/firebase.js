import { initializeApp, initialzeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

import { doc, setDoc } from "firebase/firestore";

export const saveFormData = async (values) => {
  console.log("values at saving form data: " + JSON.stringify(values));
  try {
    const docRef = doc(collection(db, "multistepFormData"));
    await setDoc(docRef, values);
  } catch (error) {
    console.log("error at saving form data: " + JSON.stringify(error));
    throw error;
  }
};
