"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Row, Select} from "antd";
import { SuperLine } from "../SuperLine";
import {useTranslations} from "@/hooks/useTranslations";

export const GalleryFilterBar = () => {
    const t = useTranslations();

    const {
        uploaderName,
        setUploaderName,
        uploaderNames,
        tag,
        setTag,
        tags,
        setLoading
    } = useContext(GalleryContext);

    return <Row justify="center" gutter={15} className="mb-4">
        <Col>
            <SuperLine>{t("By whom?")}</SuperLine>
            <Row>
                <Select
                    className="min-w-32"
                    value={uploaderName}
                    onSelect={value => {
                        setUploaderName(value);
                        setLoading(true);
                    }}
                    options={[
                        { label: t("Anyone"), value: "" },
                        ...(uploaderNames.map(value => ({label: value, value})))
                    ]}
                />
            </Row>
        </Col>

        <Col>
            <SuperLine>{t("Tag")}</SuperLine>
            <Row>
                <Select
                    className="min-w-32"
                    value={tag}
                    onSelect={value => {
                        setTag(value);
                        setLoading(true);
                    }}
                    options={[
                        { label: t("Any Tag"), value: "" },
                        ...(tags.map(value => ({label: value, value})))
                    ]}
                />
            </Row>
        </Col>
    </Row>
}