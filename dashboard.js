

import { getAuth, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification,signOut  } from "./firebase.js";

const auth = getAuth();
const profile =  document.getElementById('profile')


  
onAuthStateChanged(auth, (user) => {
  if (user) {
      const uid = user.uid;
      console.log(uid,user);
      
     profile.innerHTML = `<div class="flex flex-no-wrap " id="profile">
    <div class="w-64 bg-gray-800 h-screen shadow-lg hidden lg:block">
      <div class="p-6">
        <h1 class="text-white text-2xl font-bold">Dashboard</h1>
      </div>
      <nav class="mt-8 grid-cols-1">

      <img id="previewImage" src="${user.photoURL}" alt="User Avatar" class="w-16 h-16 rounded-full border-2 border-gray-300">

      <a class="ml-4 text-white-700 font-semibold" id="user">Hello, ${user.displayName}</a>
    
    
       <a href="#" id="updateEmail"
    class="block px-4 py-2 text-sm font-semibold text-gray-300 rounded-lg hover:bg-gray-700">
    Email: ${user.email}</a>
   
  <button id="verifyEmail"
    class="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-black-600 rounded-lg hover:bg-blue-700"
  >
    Verify Email: ${user.verifyEmail ? "Yes" : "No"}
  </button>
  <button
    id="signOut"
    class="block w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-white-600 rounded-lg hover:bg-black-700"
  >
    Logout
  </button>
  
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col w-full lg:ml-84">

      <!-- Top Bar -->
      <header class="w-full bg-white shadow p-4 flex items-center justify-between">
      
       <div>
          <h2 class="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>  <button id="update" class="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
      Update Photo
    </button>
  </div>
  <input type="file" id="fileInput" accept="image/*" class="hidden">
</div>
       

      </main>
      
      </div>
    </div>
  </div>
   `

       
   // Verify Email

  document.getElementById("verifyEmail").addEventListener("click", (e) => {
  e.preventDefault();

  sendEmailVerification(auth.currentUser)
 
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Verification Email Sent!",
        text: "Check your email inbox or spam folder to verify your email.",
      });
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Unable to send verification email.",
        footer: error.message,
      });
    });
});
        //update profile

   document.getElementById("update").addEventListener("click",async () => {
    const display = document.getElementById('user')
    display.innerHTML= user.displayName
    const fileInput = document.getElementById("fileInput");
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          e.preventDefault();
          
          // Update preview
          document.getElementById("previewImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
       
        try {
          // Assuming updateProfile from Firebase Auth is being used
          await updateProfile(auth.currentUser, {
           
            photoURL: e.target.result, // Base64 string for simplicity
          });
          Swal.fire("Profile Updated", "Your photo has been updated successfully!", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: error.message,
          });
        }
      }
    };
  });

    //signOut
    document.getElementById('signOut').addEventListener('click', (e) => {
      e.preventDefault();
      signOut(auth).then(() => {
      
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Sign-out successful."
        });
        location.href = "./login.html";
      }).catch((error) => {
        // An error happened.
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: 'An error happened.'
        });
      });
    
    });
   } else {
      location.href = "./login.html";
      }
    });
    