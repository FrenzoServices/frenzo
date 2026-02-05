import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { analyticsService } from '../../analytics/analyticsService';

/**
 * Service to handle all Authentication interactions with Firebase.
 * This separates the "How" (Firebase) from the "What" (Login/Signup).
 */
export const authService = {
  /**
   * Register a new user with email and password
   * @param {string} email 
   * @param {string} password 
   * @param {string} name 
   * @returns {Promise<User>}
   */
  register: async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Update display name immediately
      if (name) {
          await updateProfile(userCredential.user, {
              displayName: name
          });
      }
      analyticsService.logLogin('email', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  /**
   * Log in an existing user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<User>}
   */
  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      analyticsService.logLogin('email', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  /**
   * Log into with Google
   * @returns {Promise<User>}
   */
  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      analyticsService.logLogin('google', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  /**
   * Initiate Phone Login (Sends SMS)
   * @param {string} phoneNumber - E.164 format (e.g., +15555555555)
   * @param {object} appVerifier - Firebase RecaptchaVerifier instance
   * @returns {Promise<ConfirmationResult>}
   */
  loginWithPhone: async (phoneNumber, appVerifier) => {
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        return confirmationResult;
    } catch (error) {
        throw mapFirebaseError(error);
    }
  },

  /**
   * Verify Phone Code and Sign In
   * @param {object} confirmationResult - Result from loginWithPhone
   * @param {string} code - OTP code entered by user
   * @returns {Promise<User>}
   */
  verifyPhoneCode: async (confirmationResult, code) => {
      try {
          const result = await confirmationResult.confirm(code);
          analyticsService.logLogin('phone', result.user.uid);
          return result.user;
      } catch (error) {
          throw mapFirebaseError(error);
      }
  },

  /**
   * Log out the current user
   */
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  }
};

/**
 * Helper to map confusing Firebase error codes to human-readable messages
 */
const mapFirebaseError = (error) => {
    let message = "An unexpected error occurred";
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = "This email is already in use.";
            break;
        case 'auth/invalid-email':
            message = "Please enter a valid email address.";
            break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
            message = "Invalid email or password.";
            break;
        case 'auth/weak-password':
            message = "Password should be at least 6 characters.";
            break;
        default:
            message = error.message;
    }
    return new Error(message);
  };
