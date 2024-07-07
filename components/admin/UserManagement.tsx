"use client"

import {useTranslations} from "@/hooks/useTranslations";
import Title from "antd/es/typography/Title";
import {UsersTable} from "@/components/admin/UsersTable";
import {QRCodeModal} from "@/components/admin/QRCodeModal";
import {CreateUserModal} from "@/components/admin/CreateUserModal";
import {EditUserModal} from "@/components/admin/EditUserModal";

export const UserManagement = () => {
    const t = useTranslations();

    return <>
        <Title level={1}>{t("Users")}</Title>

        <CreateUserModal />

        <EditUserModal />

        <QRCodeModal />

        <UsersTable />
    </>
}