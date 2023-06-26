import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBvwey2YxrsCkNo08OcOcmQ-JO9kBjlf4",
  authDomain: "netflix-clone-supersim.firebaseapp.com",
  projectId: "netflix-clone-supersim",
  storageBucket: "netflix-clone-supersim.appspot.com",
  messagingSenderId: "360303646901",
  appId: "1:360303646901:web:dc2d715a226e0a1eddc6fc"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
export const auth = firebase.auth()

export default db