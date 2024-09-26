import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || 'defaultapikey',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: `whatsapp-f7e8b`,
    storageBucket: 'whatsapp-f7e8b.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage();
