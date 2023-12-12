import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
export type firebaseConfigTypo = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};

const firebaseConfig: firebaseConfigTypo = {
  apiKey: "AIzaSyAMMcQF0C3zk2bFfuovZp5ZvrEzYxU04kc",
  authDomain: "fir-auth-239fc.firebaseapp.com",
  projectId: "fir-auth-239fc",
  storageBucket: "fir-auth-239fc.appspot.com",
  messagingSenderId: "10807763330",
  appId: "1:10807763330:web:abde7ed59fc347ee2c6f9b",
  measurementId: "G-FQTGZ01DFK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);

export {
  app,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  doc,
  facebookProvider,
  getDoc,
  getDocs,
  googleProvider,
  setDoc,
};
