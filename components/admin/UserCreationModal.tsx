import {Button, Checkbox, Col, Input, Modal, notification, Row} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {useTranslations} from "@/hooks/useTranslations";
import {useCallback, useContext, useMemo, useState} from "react";
import {SuperLine} from "@/components/SuperLine";
import {AdminContext} from "@/components/admin/AdminContextProvider";
import {PermissionRecord} from "@/components/login/AuthContextProvider";
import {createUser} from "@/actions/firebaseAdmin/createUser";
import {doc, setDoc} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

export const UserCreationModal = () => {
    const t = useTranslations();
    const { users } = useContext(AdminContext);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [permissions, setPermissions] = useState<PermissionRecord>({
        upload: false,
        download: false,
        present: false,
        admin: false
    });
    
    const [loading, setLoading] = useState(false);

    const onCancel = useCallback(() => setOpen(false), [setOpen]);

    /**
     * creates a new user in firebase via the back-end and saves its permissions in firestore
     *
     * @param email
     * @param password
     * @param permissions
     */
    const saveUser = useCallback(async (email: string, password: string, permissions: PermissionRecord) => {
        setLoading(true);
        
        try {
            const uid = await createUser(email, password, permissions);

            await setDoc(
                doc(firestore, "users", uid),
                {
                    email,
                    permissions
                }
            );

            setEmail("");
            setPassword("");

            onCancel();
        } catch (error) {
            notification.error({ message: "Could not create user" });
        }
        
        setLoading(false);
    }, [onCancel, setEmail, setPassword]);
    
    const duplicateEmail = useMemo(() => users.some(user => user.email === email), [email, users]);

    return <>
        <Modal
            open={open}
            onCancel={onCancel}
            title={t("Create User")}
            footer={<Row gutter={10} justify="end">
                <Col><Button loading={loading} disabled={duplicateEmail} type="primary" onClick={() => saveUser(email, password, permissions)}>{t("Save")}</Button></Col>
                <Col><Button loading={loading} onClick={onCancel}>{t("Close")}</Button></Col>
            </Row>}
        >
            <Col>
                <SuperLine>{t("E-Mail")}</SuperLine>
                <Row className={duplicateEmail ? "" : "mb-5"}>
                    <Input
                        type="email"
                        placeholder={t("E-Mail")}
                        value={email}
                        onChange={({target: {value}}) => setEmail(value)}
                    />
                </Row>

                {duplicateEmail && <Row justify="end" className="text-red-600 text-xs !mt-1">{t("E-Mail already exists")}</Row>}

                <SuperLine>{t("Password")}</SuperLine>
                <Row className="mb-5">
                    <Input.Password
                        type="password"
                        placeholder={t("Password")}
                        value={password}
                        onChange={({target: {value}}) => setPassword(value)}
                    />
                </Row>

                <SuperLine>{t("This user may:")}</SuperLine>
                <Row className="mb-5">
                    {Object.entries(permissions).map(([permission, value]) => <Col key={permission}>
                        <Checkbox
                            checked={value}
                            onChange={({ target: { checked } }) => setPermissions({ ...permissions, [permission]: checked })}
                        >
                            {t(permission)}
                        </Checkbox>
                    </Col>)}
                </Row>
            </Col>
        </Modal>
        <Row className="mb-5">
            <Button 
                type="primary" 
                icon={<UserAddOutlined />} 
                loading={loading}
                onClick={() => setOpen(true)}
            >{t("Create User")}</Button>
        </Row>
    </>
}