"use server"

import {adminAuth} from "@/lib/firebase/firebaseAdmin";
import {UserRecord} from "firebase-admin/auth";

export const changePassword = async (uid: string, password: string) => {
    await adminAuth.updateUser(uid, {password});
}