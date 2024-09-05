"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import {Col, Pagination, Row, Skeleton} from "antd";
import {ImagePanel} from "@/components/gallery/ImagePanel";
import {pageSize} from "@/components/gallery/GalleryContextProvider";
import {useTranslations} from "@/hooks/useTranslations";

export const GalleryPanel = () => {
    const t = useTranslations();
    const { images, page, setPage, total, loading } = useContext(GalleryContext);

    const pagination = <Row justify="center" className="mt-3 mb-3">
        <Pagination
            pageSize={pageSize}
            current={page}
            onChange={(current) => setPage(current)}
            total={total}
            showTotal={(total, range) => t("%start - %end of %total")
                .replace("%start", range[0].toString())
                .replace("%end", range[1].toString())
                .replace("%total", total.toString())
            }
            showSizeChanger={false}
            hideOnSinglePage
        />
    </Row>;

    return <>
        {pagination}

        <Row
            wrap={true}
            gutter={[15, 15]}
            justify="center"
            align="middle">
            <Skeleton className="max-w-96" loading={loading} active>
                {images
                    .slice((page - 1) * pageSize, page * pageSize)
                    .map(image =>
                        <Col key={image.id}>
                            <ImagePanel image={image} />
                        </Col>
                    )
                }
            </Skeleton>
        </Row>

        {pagination}
    </>

}