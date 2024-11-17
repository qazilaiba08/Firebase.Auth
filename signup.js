
import { serverTimestamp,getAuth, collection,updateDoc,
    arrayUnion,query,orderBy,
    getDoc,onSnapshot, getDocs, setDoc,
    addDoc, db,doc , createUserWithEmailAndPassword} from './firebase.js';

const auth = getAuth();

let signUpBtn = document.getElementById("signupBtn"); // Corrected to match HTML
let signUpEmail = document.getElementById("email");
let signUpPass = document.getElementById("password");
let name = document.getElementById("name");
let cnic = document.getElementById("cnic")
let address = document.getElementById("address");
let phoneNo = document.getElementById("phoneNo");
let age = document.getElementById("age");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

 
if (signUpBtn) {
    signUpBtn.addEventListener("click",  async (e) => {
        e.preventDefault();

        try {
            const docRef = await addDoc(collection(db, "users"), {
                name : name.value,
                cnic:  cnic.value,
                address: address.value,
                phoneNo: phoneNo.value,
               age: age.value,
               
            time: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        const userRef = doc(db, "users", "user-uid");
        try {
          await setDoc(userRef, {
            createdAt: serverTimestamp(),
          });
          console.log("User signed up successfully!");
        } catch (error) {
          console.error("Error signing up:", error);
        }
     // add data with decided id
         try {
         await setDoc(doc(db, "users", "463324"), {
            name : name.value,
            cnic:  cnic.value,
            address: address.value,
            phoneNo: phoneNo.value,
           age: age.value,
          
        });
    console.log("Document written");
    
    } catch (e) {
    console.log(e);
    }  
    // read all the documents
    try {
    const querySnapshot = await getDocs(collection(db, "users"));
    
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>` ,doc.data());
    });
    } catch (e) {
    console.log(e);
    }
    
    // get a single doc
    
    const docRef = doc(db, "users", "442412");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
    let time = docSnap.data().time
    console.log("Document data:",`${time.toString()}`);
    // console.log(time);
    } else {
   
    console.log("No such document!");
    }
   
      // update all documents

//   const userRef = doc(db, "users", "42345454545");
  try {
    await updateDoc(userRef, {
      "favorites.subject":"Maths",
    });
    console.log("data updated");
  } catch (e) {
    console.log(e);
  }
     try {
    await updateDoc(userRef, {
      colors: arrayUnion("red","blue","yellow")
  });
    console.log("array included");
  } catch (e) {
    console.log(e);
  }
    const q = query(userRef,orderBy("name","desc")) 
    // const q = query(userRef,where("age",">","18")) 
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
     console.count("calling");
    let userDiv = document.getElementById("userName");
    userDiv.innerHTML = "";
    querySnapshot.forEach((doc) => {
     
    
      userDiv.innerHTML += `<p> ${doc.data().name}</p>`;
      console.log(doc.data().name);
    });
    });
        // Validation
        if (!signUpEmail.value || !signUpPass.value) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "All fields are mandatory to fill."
            });
            // return;
        } else if (!emailPattern.test(signUpEmail.value)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email address."
            });
            // return;
        } else if (!passwordPattern.test(signUpPass.value)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long."
            });
            return;
        }
        
        // Clear error message if validation passes
        Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
        });

        // Create user
        createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPass.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            Swal.fire({
                title: "Success!",
                text: "You signed up successfully!",
                icon: "success"
             });
          location.href = 'login.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error:", errorMessage);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: `<a href="#">${errorMessage}</a>`
            });
        });
    });
    
} else {
    console.log("Signup button not found.");
}
