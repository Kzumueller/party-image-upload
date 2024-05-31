"use server"

import {adminAuth} from "@/routes/firebaseAdmin/firebaseAdmin";
import {setDoc} from "firebase/firestore";
import {doc} from "@firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";
import { PermissionRecord } from "@/components/login/AuthContextProvider";

export const createUser = async (email: string, password: string, permissions: PermissionRecord) => {
    const userRecord = await adminAuth.createUser({
        email,
        password
    });

    await setDoc(
        doc(firestore, "users", userRecord.uid),
        {
            email,
            permissions
        }
    )
}