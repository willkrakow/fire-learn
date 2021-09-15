const dotenv = require('dotenv');

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyAHs3BDMtCrM4EoyIFBfZAhMT37ebkk3Zw",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "fire-learn-ffc4e.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "fire-learn-ffc4e",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "fire-learn-ffc4e.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "936895465833",
  appId: process.env.FIREBASE_APP_ID || "1:936895465833:web:4d22b12e724e5156f095f8",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-0L1P008S3H",
  }

export default firebaseConfig