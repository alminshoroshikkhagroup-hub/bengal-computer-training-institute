import { getFirestore, collection, addDoc, getDocs, query, where, doc, getDocFromServer } from 'firebase/firestore';
import { auth } from './googleDriveAuth';

// Initialize Firestore singleton with the same Firebase app
export const db = getFirestore(auth.app);

// Connection test per firebase-integration skill instructions
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase Firestore is currently offline or uninitialized.');
    }
  }
}
testFirestoreConnection();

export interface FirestoreAdmission {
  fullName: string;
  phone: string;
  email?: string;
  courseId: string;
  courseName: string;
  address?: string;
  couponCode?: string;
  batch?: string;
  status: 'pending' | 'verified' | 'enrolled';
  createdAt: string;
  userId?: string;
}

/**
 * Saves online admission application to Firestore
 */
export async function saveAdmissionApplication(data: FirestoreAdmission): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'admissions'), {
      ...data,
      userId: auth.currentUser?.uid || 'anonymous',
      submittedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore admission save warning:', error);
    // Return a local tracking ID if network or permissions fail
    return `LOCAL-${Date.now()}`;
  }
}

export interface FirestoreNewsletterSubscriber {
  email: string;
  name?: string;
  interest?: string;
  source?: string;
  subscribedAt: string;
  userId?: string;
}

/**
 * Saves newsletter subscriber to Firestore
 */
export async function saveNewsletterSubscription(data: FirestoreNewsletterSubscriber): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'newsletter_subscribers'), {
      ...data,
      userId: auth.currentUser?.uid || 'anonymous',
      submittedAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.warn('Firestore newsletter save warning:', error);
    return `NEWSLETTER-${Date.now()}`;
  }
}

