"use client"

import {createContext, ReactNode, useState} from "react"
import {User} from "@firebase/auth-types";

export type AdminState = {
    users: User[];
    setUsers: (list: User[]) => void;
    loading: boolean,
    setLoading: (bool: boolean) => void
};

export const AdminContext = createContext<AdminState>({
    users: [],
    setUsers: () => {},
    loading: false,
    setLoading: () => {}
})

export const AdminContextProvider = ({children}: { children: ReactNode }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return <AdminContext.Provider value={{
        users,
        setUsers,
        loading,
        setLoading
    }}>{children}</AdminContext.Provider>
}