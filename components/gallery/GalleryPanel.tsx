"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Pagination, Row, Skeleton} from "antd";
import {ImagePanel} from "@/components/gallery/ImagePanel";
import {pageSize} from "@/components/gallery/GalleryContextProvider";

export const GalleryPanel = () => {
    const { images, page, setPage, total, loading } = useContext(GalleryContext);

    if(loading) return <Skeleton loading active />

    return <>
        <Row
            wrap={true}
            gutter={[15, 15]}
            justify="center"
            align="middle">
            {images
                .slice((page - 1) * pageSize, page * pageSize)
                .map(image =>
                    <Col key={image.id}>
                        <ImagePanel image={image}></ImagePanel>
                    </Col>
                )
            }
        </Row>

        <Row justify="end">
            <Pagination
                pageSize={pageSize}
                current={page}
                onChange={(current) => setPage(current)}
                total={total}
                showTotal={(total, range) => `${range[0]} - ${range[1]} von ${total}`}
                showSizeChanger={false}
                hideOnSinglePage
            />
        </Row>
    </>

}