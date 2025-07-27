// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOWHhy4l3gs1rZb6ypDNrlFluq6208rzI",
  authDomain: "karan-s-netflixclone.firebaseapp.com",
  projectId: "karan-s-netflixclone",
  storageBucket: "karan-s-netflixclone.firebasestorage.app",
  messagingSenderId: "258923502688",
  appId: "1:258923502688:web:5da49614acc4d2b5d1f705",
  measurementId: "G-8RZ5BC8T7G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
export const auth = getAuth(app);