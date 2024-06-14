// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXvkM6GAFH-E43iAM1eOL9ix3sGoHxUac",
    authDomain: "store-194b1.firebaseapp.com",
    projectId: "store-194b1",
    storageBucket: "store-194b1.appspot.com",
    messagingSenderId: "15031460048",
    appId: "1:15031460048:web:285c17db504ca6a90dbed5",
    measurementId: "G-DMLC5ZHDBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};