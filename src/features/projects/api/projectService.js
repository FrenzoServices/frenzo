import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { PROJECT_STATUS } from '../constants';

const COLLECTION = 'projects';

export const projectService = {
  /**
   * Create a new project (Admin only)
   */
  createProject: async (projectData) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...projectData,
        status: PROJECT_STATUS.REQUESTED,
        isLocked: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },

  /**
   * Get all projects (Admin) or user-specific projects (Client)
   */
  getProjects: async (userId, isAdmin = false) => {
    try {
      let q;
      if (isAdmin) {
        q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'));
      } else {
        q = query(
          collection(db, COLLECTION), 
          where('clientId', '==', userId)
          // orderBy('createdAt', 'desc') // Removed to avoid index requirement for now
        );
      }
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  },

  /**
   * Get Public Projects (Showcase)
   */
  getPublicProjects: async () => {
    try {
      const q = query(
        collection(db, COLLECTION), 
        where('isPublic', '==', true),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching public projects:", error);
      throw error;
    }
  },

  /**
   * Get single project details
   */
  getProjectById: async (projectId) => {
    try {
      const docRef = doc(db, COLLECTION, projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("Project not found");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },

  /**
   * Update project details
   */
  updateProject: async (projectId, data) => {
    try {
      const docRef = doc(db, COLLECTION, projectId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },

  /**
   * Add a task to a project (Admin)
   */
  addTask: async (projectId, taskData) => {
    try {
      const tasksRef = collection(db, COLLECTION, projectId, 'tasks');
      await addDoc(tasksRef, {
        ...taskData,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  /**
   * Add a comment to a project
   */
  addComment: async (projectId, commentData) => {
    try {
      const commentsRef = collection(db, COLLECTION, projectId, 'comments');
      await addDoc(commentsRef, {
        ...commentData,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  
  /**
   * Subscribe to Comments (Real-time)
   */
  subscribeToComments: (projectId, callback) => {
    const q = query(
      collection(db, COLLECTION, projectId, 'comments'), 
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(comments);
    });
  },

  /**
   * Subscribe to Tasks (Real-time)
   */
  subscribeToTasks: (projectId, callback) => {
    const q = query(
      collection(db, COLLECTION, projectId, 'tasks'), 
      orderBy('createdAt', 'asc')
    );
    return onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(tasks);
    });
  },
  
  /**
   * Update Task Status
   */
  updateTask: async (projectId, taskId, data) => {
    try {
      const taskRef = doc(db, COLLECTION, projectId, 'tasks', taskId);
      await updateDoc(taskRef, data);
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
};
