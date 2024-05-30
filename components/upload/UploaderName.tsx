"use client"

import {SuperLine} from "@/components/SuperLine";
import {Input, Row} from "antd";
import {useContext, useEffect} from "react";
import {UploadContext} from "@/components/upload/UploadContextProvider";
import {useTranslations} from "@/hooks/useTranslations";

export const UploaderName = () => {
    const t = useTranslations();
    const {
        uploaderName,
        setUploaderName
    } = useContext(UploadContext);

    useEffect(() => {
        if (uploaderName !== "") localStorage.setItem("uploaderName", uploaderName);
    }, [uploaderName])

    return <>
        <SuperLine>{t("What's your name?")}</SuperLine>
        <Row><Input placeholder={t("My name is ...")} value={uploaderName} onChange={({ target: { value } }) => setUploaderName(value)} /></Row>
    </>
}