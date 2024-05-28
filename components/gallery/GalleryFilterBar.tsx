"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Row, Select} from "antd";
import { SuperLine } from "../SuperLine";

export const GalleryFilterBar = () => {
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
            <SuperLine>Von wem?</SuperLine>
            <Row>
                <Select
                    className="min-w-32"
                    value={uploaderName}
                    onSelect={value => {
                        setUploaderName(value);
                        setLoading(true);
                    }}
                    options={[
                        { label: "Egal", value: "" },
                        ...(uploaderNames.map(value => ({label: value, value})))
                    ]}
                />
            </Row>
        </Col>

        <Col>
            <SuperLine>Tag</SuperLine>
            <Row>
                <Select
                    className="min-w-32"
                    value={tag}
                    onSelect={value => {
                        setTag(value);
                        setLoading(true);
                    }}
                    options={[
                        { label: "Egal", value: "" },
                        ...(tags.map(value => ({label: value, value})))
                    ]}
                />
            </Row>
        </Col>
    </Row>
}