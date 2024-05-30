import Title from "antd/es/typography/Title";
import {Col} from "antd";
import {GalleryContextProvider} from "@/components/gallery/GalleryContextProvider";
import {GallerySubscriber} from "@/components/gallery/GallerySubscriber";
import {GalleryFilterBar} from "@/components/gallery/GalleryFilterBar";
import {GalleryPanel} from "@/components/gallery/GalleryPanel";
import {GalleryHeader} from "@/components/gallery/GalleryHeader";

export default function GalleryPage() {
    return <GalleryContextProvider>
        <GallerySubscriber />

        <Col>
            <GalleryHeader />

            <GalleryFilterBar />

            <GalleryPanel />
        </Col>
    </GalleryContextProvider>
}