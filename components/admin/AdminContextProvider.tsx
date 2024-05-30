"use client"

import {createContext, ReactNode, useState} from "react"

export type UserData = {
    id?: string
    email: string;
    permissions: Permissions;
}

export type AdminState = {
    users: UserData[];
    setUsers: (list: UserData[]) => void;
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
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return <AdminContext.Provider value={{
        users,
        setUsers,
        loading,
        setLoading
    }}>{children}</AdminContext.Provider>
}