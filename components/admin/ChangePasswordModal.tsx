import {Button, Col, Input, Modal, notification, Row} from "antd";
import {useCallback, useContext, useState} from "react";
import {AdminContext} from "@/components/admin/AdminContextProvider";
import {useTranslations} from "@/hooks/useTranslations";
import {changePassword} from "@/actions/firebaseAdmin/changePassword";

export const ChangePasswordModal = () => {
    const t = useTranslations();
    const {
        selectedUser,
        setSelectedUser,
        changePasswordModalOpen,
        setChangePasswordModalOpen
    } = useContext(AdminContext);
    
    const [password, setPassword] = useState("");

    /** Closes the modal */
    const onClose = useCallback(() => {
        setChangePasswordModalOpen(false);
        setPassword("");
        setSelectedUser(null);
    }, [setChangePasswordModalOpen, setSelectedUser]);

    /** updates selectedUser's password */
    const updatePassword = useCallback(async() => {
        try {
            await changePassword(selectedUser!.id!, password);
            
            notification.success({ message: t("Password changed successfully!") })
            
            onClose();
        } catch (error) {
            console.error(error);
            notification.error({ message: t("Error while changing password!") });
        }
    }, [selectedUser, password, t, onClose]);

    return <Modal
        open={changePasswordModalOpen}
        title={t("Change Password")}
        onCancel={onClose}
        footer={
        <Row justify="end" gutter={10}>
            <Col><Button type="primary" onClick={updatePassword}>{t("Change Password")}</Button></Col>
            <Col><Button onClick={onClose}>{t("Close")}</Button></Col>
        </Row>}
    >
        <Row className="m-2 mt-6 mb-6">
            <Col span={24}>
                <Input.Password
                    placeholder={t("Password")}
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                />
            </Col>
        </Row>
    </Modal>;
}