

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 
  import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged
    , updateProfile, updateEmail, sendEmailVerification,signOut
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

  import { serverTimestamp,where, getFirestore,getDocs ,doc,
    arrayUnion,arrayRemove,getDoc,onSnapshot, setDoc, collection,
    query,orderBy,updateDoc,addDoc 
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
  

  const firebaseConfig = {
    apiKey: "AIzaSyBnJ4oMmZyekslqBBCTTvPGuPH6tjIM9Cs",
    authDomain: "fir-authentication-3512a.firebaseapp.com",
    projectId: "fir-authentication-3512a",
    storageBucket: "fir-authentication-3512a.appspot.com",
    messagingSenderId: "279370285960",
    appId: "1:279370285960:web:71550ec29729972cc4303d"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore(app); 


export {serverTimestamp,getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged
  , updateProfile, updateEmail, sendEmailVerification,signOut ,db, collection,doc,addDoc,getDocs ,setDoc 
  ,getDoc,onSnapshot,query,orderBy,updateDoc,
  arrayUnion,arrayRemove,where
}