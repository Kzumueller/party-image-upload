"use client"

import {useCallback, useContext, useMemo, useState} from "react";
import {AdminContext, UserData} from "@/components/admin/AdminContextProvider";
import {Button, Col, QRCode, Row, Table} from "antd";
import {useTranslations} from "@/hooks/useTranslations";
import {PermissionRecord} from "@/components/login/AuthContextProvider";
import {QrcodeOutlined} from "@ant-design/icons";
import {QRCodeModal} from "@/components/admin/QRCodeModal";

export const UsersTable = () => {
    const t = useTranslations();
    const { 
        users,
        setSelectedUser,
        setQrModalOpen,
        loading 
    } = useContext(AdminContext);

    const columns = useMemo(() => [
        {
            key: "email",
            title: t("E-Mail"),
            dataIndex: "email",
        },
        {
            key: "permissions",
            title: t("Permissions"),
            dataIndex: "permissions",
            render: (permissions: PermissionRecord) => Object
                .entries(permissions)
                .filter(([_, value]) => value)
                .map(([key]) => t(key))
                .join(", ")
        },
        {
            key: "actions",
            render: (_: any, user: UserData) => <Col>
                <Row>
                    <Button
                        type="primary"
                        icon={<QrcodeOutlined />}
                        onClick={() => {
                            setSelectedUser(user);
                            setQrModalOpen(true);
                        }}
                    />
                </Row>
            </Col>
        }
    ], [setQrModalOpen, setSelectedUser, t]);

    return <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={{
                hideOnSinglePage: true
            }}
        />;
}