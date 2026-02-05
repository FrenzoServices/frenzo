import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { authService } from '../features/auth/api/authService';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Subscribe to auth state changes
  // Subscribe to auth state changes
  useEffect(() => {
    if (auth) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
    } else {
        console.warn("Firebase Auth not initialized. Check your .env setup.");
        setLoading(false);
        return () => {};
    }
  }, []);

  const signup = (email, password, name) => {
    return authService.register(email, password, name);
  };

  const login = (email, password) => {
    return authService.login(email, password);
  };

  const loginWithGoogle = () => {
    return authService.loginWithGoogle();
  };

  const loginWithPhone = (phoneNumber, appVerifier) => {
    return authService.loginWithPhone(phoneNumber, appVerifier);
  };

  const verifyPhoneCode = (confirmationResult, code) => {
    return authService.verifyPhoneCode(confirmationResult, code);
  };

  const logout = () => {
    return authService.logout();
  };

  const value = {
    currentUser,
    signup,
    login,
    loginWithGoogle,
    loginWithPhone,
    verifyPhoneCode,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
