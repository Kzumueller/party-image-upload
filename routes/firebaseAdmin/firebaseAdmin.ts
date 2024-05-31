import {applicationDefault, initializeApp} from "firebase-admin/app"
import {getAuth} from "firebase-admin/auth";
import {firebaseConfig} from "@/lib/firebase/firebase";

export const firebaseAdmin = initializeApp({
    credential: applicationDefault(),
    projectId: firebaseConfig.projectId,
}, "serverSideApp");

export const adminAuth = getAuth(firebaseAdmin);