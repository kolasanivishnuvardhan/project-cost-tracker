// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, browserPopupRedirectResolver } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, doc, setDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8beuIaFjo-eSXZnd3f6Ocn36Vu2O4twU",
  authDomain: "project-cost-tracker-c76db.firebaseapp.com",
  projectId: "project-cost-tracker-c76db",
  storageBucket: "project-cost-tracker-c76db.appspot.com",
  messagingSenderId: "512808589455",
  appId: "1:512808589455:web:95a99bb7b9b3b1d27138fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with custom settings to improve popup behavior
const auth = getAuth(app, {
  popupRedirectResolver: browserPopupRedirectResolver,
});
auth.useDeviceLanguage();

// Initialize Firestore
const db = getFirestore(app);

// Set up Firestore, create the collections if they don't exist
const setupFirestore = async (userId) => {
  try {
    console.log("Setting up Firestore collections for user:", userId);
    
    // Attempt to create user document if it doesn't exist
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, { 
      createdAt: new Date(),
      lastLogin: new Date()
    }, { merge: true });
    console.log("User document created or updated");
    
    // Create items and otherCosts collections structure
    const itemsCollRef = collection(db, 'users', userId, 'items');
    const otherCostsCollRef = collection(db, 'users', userId, 'otherCosts');
    
    // No sample data will be added as per user's request
    
    console.log("Firestore collections set up successfully for user:", userId);
    return { success: true };
  } catch (error) {
    console.error("Error setting up Firestore collections:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    return { success: false, error };
  }
};

export { auth, db, setupFirestore }; 