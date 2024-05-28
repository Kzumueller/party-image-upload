"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Row, Skeleton} from "antd";
import {ImagePanel} from "@/components/gallery/ImagePanel";

export const GalleryPanel = () => {
    const { images, loading } = useContext(GalleryContext);

    if(loading) return <Skeleton loading active />

    return <Row wrap={true} gutter={[15, 15]} justify="center" align="middle">
                {images.map(image => <Col key={image.id}>
                        <ImagePanel image={image}></ImagePanel>
                    </Col>)}
        </Row>

}