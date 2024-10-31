import { getAuth, onAuthStateChanged } from "./firebase,js";

const auth = getAuth();


onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const uid = user.uid;
    
  } else {
    
  }
});
