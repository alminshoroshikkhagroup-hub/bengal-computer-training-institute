import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  type User 
} from 'firebase/auth';

export type { User };
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// All Google Workspace Scopes configured for Bengal Computer Training Institute
export const WORKSPACE_SCOPES = [
  // Drive
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  // Sheets
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  // Docs
  'https://www.googleapis.com/auth/documents',
  'https://www.googleapis.com/auth/documents.readonly',
  // Gmail
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.compose',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  // Calendar
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  // Slides
  'https://www.googleapis.com/auth/presentations',
  'https://www.googleapis.com/auth/presentations.readonly',
  // Tasks
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/tasks.readonly',
  // Forms
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/forms.responses.readonly',
  // Contacts
  'https://www.googleapis.com/auth/contacts',
  'https://www.googleapis.com/auth/contacts.readonly',
  // Classroom
  'https://www.googleapis.com/auth/classroom.courses',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me',
  'https://www.googleapis.com/auth/classroom.announcements',
];

export const DRIVE_SCOPES = WORKSPACE_SCOPES;

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach((scope) => {
  provider.addScope(scope);
});

// Set custom parameters to select_account so Google remembers user permissions without endless consent loops
provider.setCustomParameters({
  prompt: 'select_account'
});

const SESSION_TOKEN_KEY = 'bcti_gworkspace_access_token';
const SESSION_EXPIRES_KEY = 'bcti_gworkspace_token_expires_at';

// Read token from sessionStorage with expiry check
const getStoredToken = (): string | null => {
  try {
    if (typeof window === 'undefined') return null;
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    const expiresAt = sessionStorage.getItem(SESSION_EXPIRES_KEY);
    if (!token) return null;
    if (expiresAt && Date.now() > Number(expiresAt)) {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      sessionStorage.removeItem(SESSION_EXPIRES_KEY);
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

// Store token in sessionStorage for the duration of the browser session
const storeToken = (token: string | null) => {
  try {
    if (typeof window === 'undefined') return;
    if (token) {
      sessionStorage.setItem(SESSION_TOKEN_KEY, token);
      // Google access tokens expire in ~1 hour; set 55 minutes validity
      sessionStorage.setItem(SESSION_EXPIRES_KEY, String(Date.now() + 55 * 60 * 1000));
    } else {
      sessionStorage.removeItem(SESSION_TOKEN_KEY);
      sessionStorage.removeItem(SESSION_EXPIRES_KEY);
    }
  } catch {
    // Ignore storage errors in restricted iframe environments
  }
};

let cachedAccessToken: string | null = getStoredToken();
let isSigningIn = false;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void,
  onUserOnly?: (user: User) => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      const activeToken = cachedAccessToken || getStoredToken();
      if (activeToken) {
        cachedAccessToken = activeToken;
        storeToken(activeToken);
        if (onAuthSuccess) onAuthSuccess(user, activeToken);
      } else {
        // User is still authenticated in Firebase, but Google Workspace token needs reconnecting
        if (onUserOnly) {
          onUserOnly(user);
        } else if (onAuthSuccess) {
          onAuthSuccess(user, '');
        } else if (onAuthFailure) {
          onAuthFailure();
        }
      }
    } else {
      cachedAccessToken = null;
      storeToken(null);
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Google Workspace access token not received from Firebase Auth');
    }

    cachedAccessToken = credential.accessToken;
    storeToken(cachedAccessToken);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Google Sign-In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  if (!cachedAccessToken) {
    cachedAccessToken = getStoredToken();
  }
  return cachedAccessToken;
};

export const setAccessTokenInMemory = (token: string | null) => {
  cachedAccessToken = token;
  storeToken(token);
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
  storeToken(null);
};
