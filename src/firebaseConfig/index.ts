import { initializeApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, serverTimestamp, doc, getDoc, updateDoc, arrayUnion, setDoc, Timestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDZU3WoYaEpJj0QpfnZFkcBU3XP51663QY",
  authDomain: "portfolio-chirag-74ca1.firebaseapp.com",
  projectId: "portfolio-chirag-74ca1",
  storageBucket: "portfolio-chirag-74ca1.firebasestorage.app",
  messagingSenderId: "1094351760239",
  appId: "1:1094351760239:web:73a6a15f2b52a58574d69a",
  measurementId: "G-DLNVPSPP9T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const saveContactMessage = async (formData: ContactFormData) => {
  try {
    const docRef = doc(db, "contactMe", formData.email); // Email as document ID
    const docSnap = await getDoc(docRef);

    // Manually create a timestamp
    const createdAt = Timestamp.now();

    if (docSnap.exists()) {
      // Email exists → append new message
      await updateDoc(docRef, {
        messages: arrayUnion({
          ...formData,
          createdAt, // regular Firestore timestamp
        }),
        lastUpdated: serverTimestamp()
      });
    } else {
      // New email → create doc with messages array
      await setDoc(docRef, {
        email: formData.email,
        // status: "new",
        messages: [
          {
            ...formData,
            createdAt,
          }
        ],
        lastUpdated: serverTimestamp()
      });
    }

    console.log("Document saved for email:", formData.email);
    return { success: true, id: formData.email };
  } catch (error) {
    console.error("Error saving message: ", error);
    return { success: false, error };
  }
};


export { app, analytics, db };