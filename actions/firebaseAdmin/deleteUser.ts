"use server"

import {adminAuth} from "@/lib/firebase/firebaseAdmin";

export const deleteUser = async (uid: string) => adminAuth.deleteUser(uid)