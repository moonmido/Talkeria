import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQ4Z9Noa-3u2n92HQIvw5m7VS_ehnmW6w",
  authDomain: "talkeria.firebaseapp.com",
  projectId: "talkeria",
  storageBucket: "talkeria.firebasestorage.app",
  messagingSenderId: "800209825543",
  appId: "1:800209825543:web:541ce553ad9e7bb7161fa2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export{auth,createUserWithEmailAndPassword,db,doc,setDoc,signInWithEmailAndPassword }