"use client"

import {Button, Col, Modal, Row} from "antd";
import QR from "react-qr-code";
import {useTranslations} from "@/hooks/useTranslations";
import {useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
import {AdminContext} from "@/components/admin/AdminContextProvider";

export const QRCodeModal = () => {
    const t = useTranslations();
    const { 
        selectedUser, 
        setSelectedUser, 
        qrModalOpen, 
        setQrModalOpen 
    } = useContext(AdminContext);

    const [url, setUrl] = useState("");

    const svgRef = useRef<any>(null)

    useEffect(() =>
        setUrl(`${window.location.origin}/login/${selectedUser?.email ?? ""}`),
        [selectedUser?.email]
    );

    const saveImage = useCallback(async () => {
        const blob = new Blob([(svgRef.current as SVGSVGElement).outerHTML], {type:"image/svg+xml;charset=utf-8"});

        const anchor = document.createElement("a");
        anchor.href = URL.createObjectURL(blob);
        anchor.download = "QRCode.svg";

        anchor.click();
    }, []);
    
    const onClose = useCallback(() => {
        setQrModalOpen(false);
        setSelectedUser(null);
    }, [setQrModalOpen, setSelectedUser])

    return <Modal
        open={qrModalOpen}
        title={t("QR Code")}
        onCancel={onClose}
        footer={
        <Row justify="end" gutter={10}>
            <Col><Button type="primary" onClick={saveImage}>{t("Save Image")}</Button></Col>
            <Col><Button onClick={onClose}>{t("Close")}</Button></Col>
        </Row>}
    >
        <Row justify="center" align="middle" className="mb-5">
            <Col>
                <QR value={url} ref={svgRef} />
            </Col>
        </Row>
    </Modal>;
}