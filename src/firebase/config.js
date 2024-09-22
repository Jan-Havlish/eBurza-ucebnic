import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

//console.log(firebaseConfig);

const public_vapid_key = import.meta.env.VITE_FIREBASE_PUBLIC_VAPID_KEY

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "cs";

const projectFirestore = getFirestore(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

const messaging = getMessaging(app);

export { auth, projectFirestore, storage, provider, messaging, public_vapid_key };
