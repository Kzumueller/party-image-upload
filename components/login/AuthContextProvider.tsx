"use client";

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {fireAuth, firestore} from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {User} from "@firebase/auth-types";
import {usePathname, useRouter} from "next/navigation";
import {doc, getDoc} from "@firebase/firestore";

type Permissions = {
    upload: boolean;
    download: boolean;
    present: boolean;
    admin: boolean;
}

type AuthState = {
    user: User | null;
    permissions: Permissions | null;
}

export const AuthContext = createContext<AuthState>({
    user: null,
    permissions: null
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [permissions, setPermissions] = useState<Permissions | null>(null);

    /**
     * fetches permissions for the given user and updates state for both
     */
    const fetchPermissions = useCallback(async (user: User) => {
        if(!user?.uid) return null;

        const userRef = doc(firestore, "users", user.uid);
        const snap = await getDoc(userRef);

        if(snap.exists()) return snap.data().permissions
        else return null
    }, []);

    useEffect(() => {
        onAuthStateChanged(fireAuth, user => {
            fetchPermissions(user as User).then(permissions => {
                setUser(user as User);
                setPermissions(permissions);

                if(permissions && pathname === "/login") router.push("/");

                if(!user && pathname !== "/login") router.push("/login");
            });
        })
    }, []);

    return <AuthContext.Provider value={{
        user,
        permissions
    }}>
        {children}
    </AuthContext.Provider>
}