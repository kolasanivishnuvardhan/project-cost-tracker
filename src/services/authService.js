import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, setupFirestore } from '../firebase';

export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update profile with displayName
    await updateProfile(userCredential.user, { displayName });
    
    // Setup Firestore collections for the new user
    await setupFirestore(userCredential.user.uid);
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Setup Firestore collections for the user
    await setupFirestore(userCredential.user.uid);
    
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    // Use redirection instead of popup to avoid COOP issues
    const result = await signInWithPopup(auth, provider);
    
    // Setup Firestore collections for the Google user
    await setupFirestore(result.user.uid);
    
    return result.user;
  } catch (error) {
    // Check if the error is due to popup being blocked or closed
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/popup-blocked') {
      console.log('Popup was closed or blocked. Try again or use another sign-in method.');
    }
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
}; 