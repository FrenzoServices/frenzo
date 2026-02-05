import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  serverTimestamp,
  orderBy 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const COLLECTION_NAME = 'user_activities';

export const activityService = {
  /**
   * Add a new activity log for a specific user
   * @param {string} userId 
   * @param {string} activityName 
   * @param {object} details 
   */
  logActivity: async (userId, activityName, details = {}) => {
    try {
      if (!userId) throw new Error("User ID is required");
      
      await addDoc(collection(db, COLLECTION_NAME), {
        userId,
        activity: activityName,
        details,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error logging activity:", error);
      throw error;
    }
  },

  /**
   * Get all activities for a specific user
   * @param {string} userId 
   * @returns {Promise<Array>}
   */
  getUserActivities: async (userId) => {
    try {
      if (!userId) return [];

      const q = query(
        collection(db, COLLECTION_NAME), 
        where("userId", "==", userId),
        orderBy("timestamp", "desc")
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error("Error fetching activities:", error);
      throw error;
    }
  }
};
