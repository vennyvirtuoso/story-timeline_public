import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getEnv } from '../gis';

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API_KEY') || 'fallback',
  authDomain: getEnv('VITE_FIREBASE_AUTH_DOMAIN') || 'fallback',
  projectId: getEnv('VITE_FIREBASE_PROJECT_ID') || 'fallback',
  storageBucket: getEnv('VITE_FIREBASE_STORAGE_BUCKET') || 'fallback',
  messagingSenderId: getEnv('VITE_FIREBASE_MESSAGING_SENDER_ID') || 'fallback',
  appId: getEnv('VITE_FIREBASE_APP_ID') || 'fallback',
  measurementId: getEnv('VITE_FIREBASE_MEASUREMENT_ID') || 'fallback'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();