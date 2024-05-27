"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Row} from "antd";
import {ImagePanel} from "@/components/gallery/ImagePanel";

export const GalleryPanel = () => {
    const { images } = useContext(GalleryContext);

    return <Row wrap={true} gutter={[15, 15]} justify="start" align="middle">
        {images.map(image => <Col key={image.id} span={24}>
            <ImagePanel image={image}></ImagePanel>
        </Col>)}
    </Row>
}