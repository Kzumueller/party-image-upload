"use client"

import {SuperLine} from "@/components/SuperLine";
import {Input, Row} from "antd";
import {useContext, useEffect} from "react";
import {UploadContext} from "@/components/upload/UploadContextProvider";

export const UploaderName = () => {
    const {
        uploaderName,
        setUploaderName
    } = useContext(UploadContext);

    useEffect(() => {
        localStorage.setItem("uploaderName", uploaderName);
    }, [uploaderName])

    return <>
        <SuperLine>Wer bist du?</SuperLine>
        <Row><Input placeholder="Ich heiße ..." value={uploaderName} onChange={({ target: { value } }) => setUploaderName(value)} /></Row>
    </>
}