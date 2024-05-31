import {Button, Checkbox, Col, Input, Modal, Row} from "antd";
import {UserAddOutlined} from "@ant-design/icons";
import {useTranslations} from "@/hooks/useTranslations";
import {useCallback, useContext, useState} from "react";
import {SuperLine} from "@/components/SuperLine";
import {AdminContext} from "@/components/admin/AdminContextProvider";
import {PermissionRecord} from "@/components/login/AuthContextProvider";
import {createUser} from "@/routes/firebaseAdmin/createUser";

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
    })

    const onCancel = useCallback(() => setOpen(false), [setOpen]);

    return <>
        <Modal
            open={open}
            onCancel={onCancel}
            title={t("Create User")}
            footer={<Row gutter={10} justify="end">
                <Col><Button type="primary" onClick={() => createUser(email, password, permissions)}>{t("Save")}</Button></Col>
                <Col><Button onClick={onCancel}>{t("Close")}</Button></Col>
            </Row>}
        >
            <Col>
                <SuperLine>{t("E-Mail")}</SuperLine>
                <Row className="mb-5">
                    <Input
                        type="email"
                        placeholder={t("E-Mail")}
                        value={email}
                        onChange={({target: {value}}) => setEmail(value)}
                    />
                </Row>

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
            <Button type="primary" icon={<UserAddOutlined />} onClick={() => setOpen(true)}>{t("Create User")}</Button>
        </Row>
    </>
}