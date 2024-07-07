import {Button, Checkbox, Col, Input, Modal, notification, Row} from "antd";
import {useCallback, useContext, useEffect, useState} from "react";
import {AdminContext} from "@/components/admin/AdminContextProvider";
import {useTranslations} from "@/hooks/useTranslations";
import {changePassword} from "@/actions/firebaseAdmin/changePassword";
import {doc, setDoc} from "firebase/firestore";
import {fireAuth, firestore} from "@/lib/firebase/firebase";
import {PermissionRecord} from "@/components/login/AuthContextProvider";
import {SuperLine} from "@/components/SuperLine";
import {sortPermissionEntries} from "@/lib/sortPermissionEntries";

const emptyPermissions: PermissionRecord = {
    upload: false,
    download: false,
    present: false,
    admin: false
};



export const EditUserModal = () => {
    const t = useTranslations();
    const {
        selectedUser,
        setSelectedUser,
        changePasswordModalOpen,
        setChangePasswordModalOpen
    } = useContext(AdminContext);

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [permissions, setPermissions] = useState<PermissionRecord>(selectedUser?.permissions ?? emptyPermissions);

    useEffect(() => {
        setPermissions(selectedUser?.permissions ?? emptyPermissions)
    }, [selectedUser]);

    /** Closes the modal */
    const onClose = useCallback(() => {
        setChangePasswordModalOpen(false);
        setPassword("");
        setSelectedUser(null);
    }, [setChangePasswordModalOpen, setSelectedUser]);

    /** updates selectedUser's password */
    const updatePassword = useCallback(async() => {
        try {
            setLoading(true);
            
            const uid = selectedUser!.id!;

            if(password) await changePassword(uid, password);

            await setDoc(
                doc(firestore, "users", uid),
                {
                    email: selectedUser!.email,
                    permissions
                }
            );
            
            notification.success({ message: t("User edited successfully!") })
            
            onClose();
        } catch (error) {
            console.error(error);
            notification.error({ message: t("Error while editing user!") });
        }

        setLoading(false);
    }, [setLoading, selectedUser, password, permissions, t, onClose]);

    return <Modal
        open={changePasswordModalOpen}
        title={t("Edit User")}
        onCancel={onClose}
        footer={
        <Row justify="end" gutter={10}>
            <Col><Button type="primary" onClick={updatePassword} loading={loading}>{t("Save")}</Button></Col>
            <Col><Button onClick={onClose} loading={loading}>{t("Close")}</Button></Col>
        </Row>}
    >
        <Col className="ml-2 mr-2">
            <SuperLine>{t("Password")}</SuperLine>
            <Row className="mb-5">
                <Col span={24}>
                    <Input.Password
                        placeholder={t("Password")}
                        value={password}
                        onChange={({ target: { value } }) => setPassword(value)}
                    />
                </Col>
            </Row>

            <SuperLine>{t("This user may:")}</SuperLine>
            <Row className="mb-5">
                {Object.entries(permissions).sort(sortPermissionEntries).map(([permission, value]) => <Col key={permission}>
                    <Checkbox
                        checked={value}
                        disabled={selectedUser?.id === fireAuth.currentUser?.uid }
                        onChange={({ target: { checked } }) => setPermissions({ ...permissions, [permission]: checked })}
                    >
                        {t(permission)}
                    </Checkbox>
                </Col>)}
            </Row>
        </Col>
    </Modal>;
}