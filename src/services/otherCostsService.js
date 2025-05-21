import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export const fetchOtherCosts = async (userId) => {
  try {
    console.log("Fetching other costs for user:", userId);
    const costsPath = `users/${userId}/otherCosts`;
    console.log("Collection path:", costsPath);
    
    const costsRef = collection(db, 'users', userId, 'otherCosts');
    const q = query(costsRef, orderBy('description'));
    
    console.log("Executing Firestore query for other costs...");
    const querySnapshot = await getDocs(q);
    console.log("Other costs query completed, count:", querySnapshot.size);
    
    const costs = [];
    querySnapshot.forEach((doc) => {
      costs.push({ id: doc.id, ...doc.data() });
    });
    
    return costs;
  } catch (error) {
    console.error("Error fetching other costs:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
};

export const addOtherCost = async (userId, description, amount) => {
  try {
    const costsRef = collection(db, 'users', userId, 'otherCosts');
    const docRef = await addDoc(costsRef, {
      description,
      amount: Number(amount)
    });
    
    return {
      id: docRef.id,
      description,
      amount: Number(amount)
    };
  } catch (error) {
    throw error;
  }
};

export const updateOtherCost = async (userId, costId, description, amount) => {
  try {
    const costRef = doc(db, 'users', userId, 'otherCosts', costId);
    await updateDoc(costRef, {
      description,
      amount: Number(amount)
    });
    
    return {
      id: costId,
      description,
      amount: Number(amount)
    };
  } catch (error) {
    throw error;
  }
};

export const deleteOtherCost = async (userId, costId) => {
  try {
    const costRef = doc(db, 'users', userId, 'otherCosts', costId);
    await deleteDoc(costRef);
    return costId;
  } catch (error) {
    throw error;
  }
}; 