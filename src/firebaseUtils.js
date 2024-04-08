// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,
    signInWithPopup, GoogleAuthProvider

} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAR6ARYiR8bHn1j1MlvKaIRYvxLN_G6u0I",
  authDomain: "learning-firebase-37b31.firebaseapp.com",
  projectId: "learning-firebase-37b31",
  storageBucket: "learning-firebase-37b31.appspot.com",
  messagingSenderId: "1038477226411",
  appId: "1:1038477226411:web:8977b5d1f0c0e61b8762ee",
  measurementId: "G-NF7W9BFD47"
};

// Initialize Firebase
const myApp = initializeApp(firebaseConfig);
export const auth = getAuth(myApp);

export const signUp = (email,password)=>{
    createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed up 
    // console.log({userCredential});
    const user = userCredential.user;
    // console.log({user});

    const token = await user.getIdToken()
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log({errorCode,errorMessage});
    // ..
  });
}


export const logIn = (email,password)=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

export const logWithGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const googleToken = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    const firebaseToken = await  user.getIdToken()
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export const logOut = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
    
      }).catch((error) => {
        // An error happened.
        console.log(error);
      });
}

// const analytics = getAnalytics(app);