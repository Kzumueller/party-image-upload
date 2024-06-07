"use server"

import {adminAuth} from "@/lib/firebase/firebaseAdmin";
import {PermissionRecord} from "@/components/login/AuthContextProvider";

export const createUser = async (email: string, password: string, permissions: PermissionRecord) => {
    const userRecord = await adminAuth.createUser({
        email,
        password
    });

    return userRecord.uid
}