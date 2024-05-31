"use client"

import {createContext, ReactNode, useState} from "react"
import { PermissionRecord } from "@/components/login/AuthContextProvider";

export type UserData = {
    id?: string
    email: string;
    permissions: PermissionRecord;
}

export type AdminState = {
    users: UserData[];
    setUsers: (list: UserData[]) => void;
    selectedUser: UserData | null;
    setSelectedUser: (user: UserData | null) => void;
    qrModalOpen: boolean;
    setQrModalOpen: (open: boolean) => void;
    loading: boolean,
    setLoading: (bool: boolean) => void
};

export const AdminContext = createContext<AdminState>({
    users: [],
    setUsers: () => {},
    selectedUser: null,
    setSelectedUser: () => {},
    qrModalOpen: false,
    setQrModalOpen: () => {},
    loading: false,
    setLoading: () => {}
})

export const AdminContextProvider = ({children}: { children: ReactNode }) => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [qrModalOpen, setQrModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);

    return <AdminContext.Provider value={{
        users,
        setUsers,
        selectedUser,
        setSelectedUser,
        qrModalOpen,
        setQrModalOpen,
        loading,
        setLoading
    }}>{children}</AdminContext.Provider>
}