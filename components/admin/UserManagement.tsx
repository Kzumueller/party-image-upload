"use client"

import {useTranslations} from "@/hooks/useTranslations";
import Title from "antd/es/typography/Title";
import {UsersTable} from "@/components/admin/UsersTable";
import {QRCodeModal} from "@/components/admin/QRCodeModal";
import {UserCreationModal} from "@/components/admin/UserCreationModal";

export const UserManagement = () => {
    const t = useTranslations();

    return <>
        <Title level={1}>{t("Users")}</Title>

        <UserCreationModal />

        <QRCodeModal />

        <UsersTable />
    </>
}