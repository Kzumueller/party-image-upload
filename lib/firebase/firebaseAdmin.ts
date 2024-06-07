import { initializeApp } from "firebase-admin/app"
import { credential } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseAdmin = initializeApp({
    credential: credential.cert(JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS!)),
}, "serverSideApp");

export const adminAuth = getAuth(firebaseAdmin);