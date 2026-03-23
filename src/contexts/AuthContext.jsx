import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { firebaseConfig } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConfigured, setIsFirebaseConfigured] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured (not using placeholder values)
    const checkFirebaseConfig = () => {
      const config = {
        apiKey: "your-api-key",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id"
      };

      // Check if any of the key config values are still placeholders
      const isConfigured = !(
        firebaseConfig.apiKey === config.apiKey ||
        firebaseConfig.authDomain === config.authDomain ||
        firebaseConfig.projectId === config.projectId
      );

      console.log('🔥 Firebase Configuration Check:');
      console.log('  - Project ID:', firebaseConfig.projectId);
      console.log('  - Auth Domain:', firebaseConfig.authDomain);
      console.log('  - API Key (first 10 chars):', firebaseConfig.apiKey?.substring(0, 10) + '***');
      console.log('  - Status:', isConfigured ? '✅ CONNECTED' : '❌ NOT CONFIGURED');

      setIsFirebaseConfigured(isConfigured);
    };

    checkFirebaseConfig();

    if (isFirebaseConfigured) {
      console.log('✅ Firebase configured - Setting up auth state listener');
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        console.log('🔐 Auth State Changed:', firebaseUser ? (firebaseUser.isAnonymous ? 'Anonymous User' : firebaseUser.email) : 'No User');
        if (firebaseUser) {
          // Handle anonymous users
          if (firebaseUser.isAnonymous) {
            setUser({
              uid: firebaseUser.uid,
              email: null,
              displayName: 'Guest User',
              role: 'guest',
              isAnonymous: true
            });
          } else {
            // Get additional user data from Firestore for regular users
            try {
              const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
              const userData = userDoc.exists() ? userDoc.data() : {};

              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: userData.role || 'resident',
                ...userData
              });
            } catch (error) {
              // If Firestore fails, still set basic user info
              setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                role: 'resident'
              });
            }
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return unsubscribe;
    } else {
      console.warn('⚠️  Firebase not configured - Using local guest session');
      // Firebase not configured - check for local guest session
      const guestSession = localStorage.getItem('civicLinkGuestSession');
      if (guestSession) {
        setUser(JSON.parse(guestSession));
      }
      setLoading(false);
    }
  }, [isFirebaseConfigured]);

  const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  };

  const register = async (email, password, userData) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update display name
    await updateProfile(result.user, {
      displayName: userData.name
    });

    // Save additional user data to Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      name: userData.name,
      email: email,
      role: userData.role || 'resident',
      phone: userData.phone || '',
      address: userData.address || '',
      ward: userData.ward || '',
      createdAt: new Date(),
      ...userData
    });

    return result.user;
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    } else {
      // Clear local guest session
      setUser(null);
      localStorage.removeItem('civicLinkGuestSession');
    }
  };

  const loginAsGuest = async () => {
    if (isFirebaseConfigured) {
      // Use Firebase anonymous authentication
      const result = await signInAnonymously(auth);
      return result.user;
    } else {
      // Use local guest session
      const guestUser = {
        uid: 'guest-' + Date.now(),
        email: null,
        displayName: 'Guest User',
        role: 'guest',
        isLocalGuest: true
      };
      setUser(guestUser);
      localStorage.setItem('civicLinkGuestSession', JSON.stringify(guestUser));
      return guestUser;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loginAsGuest,
    loading,
    isFirebaseConfigured
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};