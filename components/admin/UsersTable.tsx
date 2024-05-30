"use client"

import {useCallback, useContext, useMemo} from "react";
import {AdminContext, UserData} from "@/components/admin/AdminContextProvider";
import {Button, Col, QRCode, Row, Table} from "antd";
import {useTranslations} from "@/hooks/useTranslations";
import {Permissions} from "@/components/login/AuthContextProvider";
import {QrcodeOutlined} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

export const UsersTable = () => {
    const t = useTranslations();
    const { users, loading } = useContext(AdminContext);

    const createQRCode = useCallback(async (email: string) => {
        
    }, [])

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
            render: (permissions: Permissions) => Object
                .entries(permissions)
                .filter(([_, value]) => value)
                .map(([key]) => t(key))
                .join(", ")
        },
        {
            key: "actions",
            render: (_: any, user: UserData) => <Col>
                <Row><Button type="primary" icon={<QrcodeOutlined />}></Button></Row>
            </Col>
        }
    ], [t]);

    return <>
        <Title level={1}>{t("Users")}</Title>
        <Table
            loading={loading}
            columns={columns}
            dataSource={users}
            pagination={{
                hideOnSinglePage: true
            }}
        />
    </>
}