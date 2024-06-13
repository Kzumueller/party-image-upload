"use client"

import {UserData} from "@/components/admin/AdminContextProvider";
import {Button, notification, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useCallback, useState} from "react";
import {useTranslations} from "@/hooks/useTranslations";
import {deleteUser} from "@/actions/firebaseAdmin/deleteUser";
import {doc, deleteDoc} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

type Props = {
    user: UserData;
}

export const DeleteUserButton = ({ user }: Props) => {
    const t = useTranslations();
    const [deleting, setDeleting] = useState(false);

    const removeUser = useCallback(async () => {
        setDeleting(true);
        
        try {
            await deleteUser(user.id!);
            await deleteDoc(doc(firestore, "users", user.id!));
        } catch(error) {
            notification.error({ message: t("Could not delete user") })
        }
        
        setDeleting(false);
    }, [t, user.id])

    return <Popconfirm title={t("Delete this user?")} onConfirm={removeUser} okText={t("Yes")} cancelText={t("No")}>
        <Button loading={deleting} danger type="primary" icon={<DeleteOutlined />} />
    </Popconfirm>;
}