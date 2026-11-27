// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSw6oFRONZWKQo5kdmCumW1Qb_YUxGTJg",
  authDomain: "localib-cb109.firebaseapp.com",
  projectId: "localib-cb109",
  storageBucket: "localib-cb109.firebasestorage.app",
  messagingSenderId: "771982283407",
  appId: "1:771982283407:web:aaeb26e8f0513f7696d6fa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});