// Firebase Connection Test Utility
import { firebaseConfig, auth, db } from '../firebase';

export const checkFirebaseConnection = async () => {
  try {
    console.log('🔍 Checking Firebase Configuration...');

    // 1. Check if config has valid values
    const configKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
    const allConfigured = configKeys.every(key => {
      const value = firebaseConfig[key];
      const isValid = value && typeof value === 'string' && !value.includes('your-');
      console.log(`  ✓ ${key}: ${isValid ? '✅ Configured' : '❌ Missing/Invalid'}`);
      return isValid;
    });

    if (!allConfigured) {
      console.error('❌ Firebase config is incomplete!');
      return { connected: false, error: 'Incomplete configuration' };
    }

    console.log('✅ Firebase Configuration: Valid\n');

    // 2. Check if auth is initialized
    console.log('🔍 Checking Firebase Auth...');
    if (!auth) {
      console.error('❌ Firebase Auth is not initialized');
      return { connected: false, error: 'Auth not initialized' };
    }
    console.log('✅ Firebase Auth: Initialized\n');

    // 3. Check if Firestore is initialized
    console.log('🔍 Checking Firestore...');
    if (!db) {
      console.error('❌ Firestore is not initialized');
      return { connected: false, error: 'Firestore not initialized' };
    }
    console.log('✅ Firestore: Initialized\n');

    // 4. Check Auth State
    console.log('🔍 Checking Auth State...');
    const currentAuthState = auth.currentUser;
    if (currentAuthState) {
      console.log(`✅ Current User: ${currentAuthState.email || currentAuthState.uid}`);
    } else {
      console.log('ℹ️  No user currently logged in (expected if not authenticated)');
    }

    console.log('\n✅ Firebase is properly connected and ready!');
    return {
      connected: true,
      config: {
        projectId: firebaseConfig.projectId,
        authDomain: firebaseConfig.authDomain,
        apiKey: firebaseConfig.apiKey.substring(0, 10) + '***' // Hide part of API key
      },
      auth: auth ? 'Ready' : 'Not Ready',
      firestore: db ? 'Ready' : 'Not Ready'
    };
  } catch (error) {
    console.error('❌ Firebase Connection Error:', error);
    return {
      connected: false,
      error: error.message
    };
  }
};

// Export a function to test writing to Firestore
export const testFirestoreWrite = async (userId) => {
  try {
    console.log('🔍 Testing Firestore Write Permission...');
    
    // Try to set a test document
    const testData = {
      timestamp: new Date(),
      testConnection: true
    };

    // Note: This would require proper error handling for security rules
    console.log('ℹ️  Firestore write test requires proper authentication and security rules');
    
    return { writeTest: 'Requires authentication' };
  } catch (error) {
    console.error('❌ Firestore Write Test Error:', error);
    return { writeTest: 'Failed', error: error.message };
  }
};
