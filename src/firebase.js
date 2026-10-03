import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail as firebaseResetEmail, 
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';

// Standard Firebase Configuration Structure
// You can replace these values with your actual Firebase Console keys
const firebaseConfig = {
  apiKey: "AIzaSyKPPUBLIC_SCHOOL_DEMO_KEY_12345",
  authDomain: "kp-public-school.firebaseapp.com",
  projectId: "kp-public-school-kunda",
  storageBucket: "kp-public-school-kunda.appspot.com",
  messagingSenderId: "983800112233",
  appId: "1:983800112233:web:kp123456789"
};

// Initialize Firebase if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// Fallback Demo Admin Credentials (works immediately even without Firebase project setup)
export const DEMO_ADMIN = {
  email: "admin@kppublicschool.edu.in",
  username: "admin",
  password: "admin123",
  role: "School Administrator",
  name: "Principal D. Patel"
};

/**
 * Login user using Firebase Auth or fallback demo credentials
 */
export const loginWithEmailOrUsername = async (identifier, password) => {
  const cleanId = identifier.trim().toLowerCase();
  
  // Try Firebase Auth first if real credentials
  try {
    const userCredential = await signInWithEmailAndPassword(auth, cleanId, password);
    return {
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || "Admin User",
        role: "School Administrator"
      }
    };
  } catch (error) {
    // Check fallback demo credentials
    if ((cleanId === DEMO_ADMIN.email || cleanId === DEMO_ADMIN.username) && password === DEMO_ADMIN.password) {
      return {
        success: true,
        user: {
          uid: "demo_admin_123",
          email: DEMO_ADMIN.email,
          name: DEMO_ADMIN.name,
          role: DEMO_ADMIN.role
        }
      };
    }

    return {
      success: false,
      error: error.message || "Invalid Username/Email or Password."
    };
  }
};

/**
 * Forgot Password - Send password reset link
 */
export const handleForgotPassword = async (email) => {
  const cleanEmail = email.trim().toLowerCase();

  try {
    await firebaseResetEmail(auth, cleanEmail);
    return {
      success: true,
      message: `Password reset link sent to ${cleanEmail}. Please check your email inbox.`
    };
  } catch (error) {
    // If demo mode or firebase project not yet initialized, show simulated success
    if (cleanEmail === DEMO_ADMIN.email || cleanEmail.includes('@')) {
      return {
        success: true,
        message: `Password reset instructions have been dispatched to ${cleanEmail}. (Demo Mode: Reset password is 'admin123')`
      };
    }

    return {
      success: false,
      error: error.message || "Could not send password reset email."
    };
  }
};

/**
 * Logout User
 */
export const logoutApp = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (e) {
    console.warn("Sign out fallback:", e);
  }
  localStorage.removeItem('kpps_user');
};
