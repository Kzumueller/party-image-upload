"use client"

import {useContext, useEffect, useMemo} from "react";
import {AdminContext} from "@/components/admin/AdminContextProvider";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";
import {Image} from "@/components/gallery/GalleryContextProvider";

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
                const users = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Image));

                setUsers(users as any);
                setLoading(false);
            },
            error => console.error(error)
        );
    }, [userQuery, setUsers]);

    return <></>;
}