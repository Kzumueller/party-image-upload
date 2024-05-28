import Title from "antd/es/typography/Title";
import {Col, Row} from "antd";
import {GalleryContextProvider} from "@/components/gallery/GalleryContextProvider";
import { GallerySubscriber } from "@/components/gallery/GallerySubscriber";
import {GalleryFilterBar} from "@/components/gallery/GalleryFilterBar";
import {GalleryPanel} from "@/components/gallery/GalleryPanel";

export default function GalleryPage() {
    return <GalleryContextProvider>
        <GallerySubscriber />

        <Col>
            <Title level={1} className="text-center">Galerie</Title>

            <GalleryFilterBar />

            <GalleryPanel />
        </Col>
    </GalleryContextProvider>
}