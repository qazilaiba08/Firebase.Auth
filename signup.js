

import { getAuth, createUserWithEmailAndPassword } from './firebase.js';

const auth = getAuth();

let signUpBtn = document.getElementById("signUpBtn");
let signUpEmail = document.getElementById("email");
let signUpPass = document.getElementById("password");



if (signUpBtn) {
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
 
        const errorMsg = "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            // Validation
            if (!signUpEmail.value || !signUpPass.value) {
                errorMsg = "All fields are mandatory to fill.";
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<a href="#">${error.message}</a>`
                });
                return;
            } else if (!emailPattern.test(signUpEmail.value)) {
                errorMsg = "Please enter a valid email address.";
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<a href="#">${error.message}</a>`
                });
                return;
            } else if (!passwordPattern.test(signUpPass.value)) {
                errorMsg = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long.";
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<a href="#">${error.message}</a>`
                });
                return;
            }
            // Clear error message if validation passes
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
              });
              createUserWithEmailAndPassword(auth, signUpEmail.value, signUpPass.value)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                Swal.fire({
                    title: "Success!",
                    text: "You SignUp Successfully!",
                    icon: "success"
                  });
                location.href = 'login.html'
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: `<a href="#">${error.message}</a>`
                });
            }) 
              })
              
            } else {
        console.log("SignUp button not found.");
    }



