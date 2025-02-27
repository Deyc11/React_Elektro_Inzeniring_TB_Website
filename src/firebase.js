import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Dodano za avtentikacijo

const firebaseConfig = {
  apiKey: "AIzaSyDZmXR-7FATJYemL_BQuh9d4N3NdRthFdA",
  authDomain: "react-elektro-inzeniring.firebaseapp.com",
  projectId: "react-elektro-inzeniring",
  storageBucket: "react-elektro-inzeniring.appspot.com", // Popravljeno: firebasestorage.app → appspot.com
  messagingSenderId: "210468466321",
  appId: "1:210468466321:web:5f1f94e55bf7be5e201930",
  measurementId: "G-ND4EKE6VYG"
};

// Inicializacija Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Firestore (za projekte, dogodke, itd.)
export const storage = getStorage(app); // Cloud Storage (za datoteke)
export const auth = getAuth(app); // Dodano: Authentication

