"use client";

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {fireAuth, firestore} from "@/lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {User} from "@firebase/auth-types";
import {usePathname, useRouter} from "next/navigation";
import {doc, getDoc} from "@firebase/firestore";

export type PermissionRecord = {
    upload: boolean;
    download: boolean;
    present: boolean;
    admin: boolean;
}

type AuthState = {
    user: User | null;
    permissions: PermissionRecord | null;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthState>({
    user: null,
    permissions: null,
    loading: true,
    setLoading: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();
    const [initialPathname] = useState(pathname);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [permissions, setPermissions] = useState<PermissionRecord | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

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
                else if(!permissions && pathname !== "/login") router.push("/login");
                else setLoading(false);
            });
        })
    }, []);

    /** detects real path changes */
    useEffect(() => {
        if(loading && pathname !== initialPathname) {
            console.log({ pathname, initialPathname })
            setLoading(false);
        }
        // no more next router events
    }, [initialPathname, pathname]);

    return <AuthContext.Provider value={{
        user,
        permissions,
        loading,
        setLoading
    }}>
        {children}
    </AuthContext.Provider>
}