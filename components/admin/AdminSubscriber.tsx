"use client"

import {useContext, useEffect, useMemo} from "react";
import {AdminContext, UserData} from "@/components/admin/AdminContextProvider";
import {collection, onSnapshot, query} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

export const AdminSubscriber = () => {
    const {
        setUsers,
        setLoading
    } = useContext(AdminContext);

    const userCollection = useMemo(() => collection(firestore, "users"), []);
    const userQuery = useMemo(() => query(userCollection), [userCollection]);

    /** Subscription effect */
    useEffect(() => {
        return onSnapshot(userQuery, snapshot => {
                const users = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as UserData));

                setUsers(users);
                setLoading(false);
            },
            error => console.error(error)
        );
    }, [userQuery, setUsers]);

    return <></>;
}