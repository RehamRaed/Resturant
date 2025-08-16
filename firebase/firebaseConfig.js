import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDy-JV7lz3ESEZGJ9yq0knzJgfn93M0xbU",
  authDomain: "resturant-ba493.firebaseapp.com",
  projectId: "resturant-ba493",
  storageBucket: "resturant-ba493.firebasestorage.app",
  messagingSenderId: "814540937660",
  appId: "1:814540937660:web:77bc455899973b662a73b9",
  measurementId: "G-2R4LH9Y6LL"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);

export { auth };