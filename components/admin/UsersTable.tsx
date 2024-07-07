"use client"

import {useCallback, useContext, useMemo, useState} from "react";
import {AdminContext, UserData} from "@/components/admin/AdminContextProvider";
import {Button, Col, QRCode, Row, Table} from "antd";
import {useTranslations} from "@/hooks/useTranslations";
import {PermissionRecord} from "@/components/login/AuthContextProvider";
import {EditOutlined, QrcodeOutlined} from "@ant-design/icons";
import {QRCodeModal} from "@/components/admin/QRCodeModal";
import {DeleteUserButton} from "@/components/admin/DeleteUserButton";
import {fireAuth} from "@/lib/firebase/firebase";

export const UsersTable = () => {
    const t = useTranslations();
    const {
        users,
        setSelectedUser,
        setQrModalOpen,
        setChangePasswordModalOpen,
        loading 
    } = useContext(AdminContext);

    const columns = useMemo(() => [
        {
            key: "email",
            title: t("E-Mail"),
            dataIndex: "email",
            width: 15
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
            render: (_: any, user: UserData) => <Col className="w-full">
                <Row gutter={[10, 10]}>
                    <Col>
                        <Button
                            type="primary"
                            icon={<QrcodeOutlined />}
                            onClick={() => {
                                setSelectedUser(user);
                                setQrModalOpen(true);
                            }}
                        />
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setSelectedUser(user);
                                setChangePasswordModalOpen(true);
                            }}
                        />
                    </Col>
                    {(user.id !== fireAuth.currentUser?.uid) && <Col>
                        <DeleteUserButton user={user}/>
                    </Col>}
                </Row>
            </Col>
        }
    ], [setChangePasswordModalOpen, setQrModalOpen, setSelectedUser, t]);

    return <Table
        rowKey={row => row.id!}
        loading={loading}
        columns={columns}
        dataSource={users}
        scroll={{ x: "100svw" }}
        pagination={{
            hideOnSinglePage: true
        }}
    />;
}