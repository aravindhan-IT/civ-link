// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDO8Okf9EBakrfGmjYGWcum3CXjOf2Q7y4",
  authDomain: "civic-link-7fe43.firebaseapp.com",
  projectId: "civic-link-7fe43",
  storageBucket: "civic-link-7fe43.firebasestorage.app",
  messagingSenderId: "1069910179068",
  appId: "1:1069910179068:web:75c0188ed0a11c679eab79",
  measurementId: "G-43DC6N198X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export { firebaseConfig };

export default app;