import pkg from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
const { credential } = pkg;
import data from './gobadi-3d7fb-firebase-adminsdk-bm88q-38ea9b9570.json' assert { type: 'json' };

// Initialize the Firebase Admin SDK
const app = initializeApp({
    credential: credential.cert(data),
    databaseURL: "https://gobadi-3d7fb-default-rtdb.firebaseio.com"
});

// Initialize Firestore
const firestore = getFirestore(app);

export { app, firestore };