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

export const fetchItems = async (userId) => {
  try {
    console.log("Fetching items for user:", userId);
    const itemsPath = `users/${userId}/items`;
    console.log("Collection path:", itemsPath);
    
    const itemsRef = collection(db, 'users', userId, 'items');
    const q = query(itemsRef, orderBy('name'));
    
    console.log("Executing Firestore query...");
    const querySnapshot = await getDocs(q);
    console.log("Query completed, items count:", querySnapshot.size);
    
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    throw error;
  }
};

export const addItem = async (userId, name, cost) => {
  try {
    const itemsRef = collection(db, 'users', userId, 'items');
    const docRef = await addDoc(itemsRef, {
      name,
      cost: Number(cost)
    });
    
    return {
      id: docRef.id,
      name,
      cost: Number(cost)
    };
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (userId, itemId, name, cost) => {
  try {
    const itemRef = doc(db, 'users', userId, 'items', itemId);
    await updateDoc(itemRef, {
      name,
      cost: Number(cost)
    });
    
    return {
      id: itemId,
      name,
      cost: Number(cost)
    };
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (userId, itemId) => {
  try {
    const itemRef = doc(db, 'users', userId, 'items', itemId);
    await deleteDoc(itemRef);
    return itemId;
  } catch (error) {
    throw error;
  }
}; 