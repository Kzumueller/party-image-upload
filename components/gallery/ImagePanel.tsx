"use client"

import {Image} from "@/components/gallery/GalleryContextProvider";
import {Card, Col, Row, Tag} from "antd";
import {SuperLine} from "@/components/SuperLine";

type Props = { image: Image };

export const ImagePanel = ({ image }: Props) => {

    return <div className="pt-2 pb-2 pl-1 pr-1 bg-white rounded-md">
        <Col>
            <Row justify="center" className="mb-2">
                <img
                    className="max-w-full max-h-96"
                    src={`https://firebasestorage.googleapis.com/v0/b/party-image-upload.appspot.com/o/${image.path.replace("/", "%2F")}?alt=media`}
                    alt={`${image.uploaderName} um ${image.createdAt.toDate().toLocaleTimeString()}`}
                />
            </Row>

            <SuperLine>
                {image.uploaderName} um {image.createdAt.toDate().toLocaleTimeString()}
            </SuperLine>

            <Row>
                {image.tags.map(tag => <Col key={tag}><Tag>{tag}</Tag></Col>)}
            </Row>
        </Col>
    </div>
}