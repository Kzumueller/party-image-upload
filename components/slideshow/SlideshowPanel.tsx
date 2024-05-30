"use client"

import {useContext, useEffect, useRef, useState} from "react";
import {SlideshowContext} from "@/components/slideshow/SlideshowContextProvider";
import {getDownloadURL, ref} from "@firebase/storage";
import {cloudStorage} from "@/lib/firebase/firebase";
import {Button, Col, Row} from "antd";
import Title from "antd/es/typography/Title";
import {useTranslations} from "@/hooks/useTranslations";

export const SlideshowPanel = () => {
    const t = useTranslations();
    const { images } = useContext(SlideshowContext);
    const [nextIndex, setNextIndex] = useState(images?.length - 1);
    const [currentImage, setCurrentImage] = useState(images[0]);
    const [currentURL, setCurrentURL] = useState('');

    console.log({ nextIndex, currentImage, images })

    const fullScreenRef = useRef<any>();

    useEffect(() => {
        console.log("images changed hook called")
        if(!currentImage) setCurrentImage(images[0]);

        setNextIndex(0);
    }, [images]);

    /** cycles backwards through images */
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage(images[nextIndex]);
            setNextIndex( nextIndex === 0 ? (images.length - 1) : (nextIndex - 1));
        }, 6000);

        return () => clearInterval(interval);
    }, [nextIndex, images]);

    useEffect(() => {
        if(!currentImage) return;

        const imageRef = ref(cloudStorage, currentImage.fullSizePath);
        getDownloadURL(imageRef).then(setCurrentURL);
    }, [currentImage]);

    /** requests the current image to be displayed in native full-screen */
    const enterFullscreen = () => (fullScreenRef.current as HTMLElement).requestFullscreen({});

    return <Col>
        <Title level={1} className="text-center">{t("Slideshow")}</Title>

        <Row justify={"center"} className="mb-5">
            <Button type="primary" onClick={enterFullscreen}>{t("Full Screen")}</Button>
        </Row>

        <Row justify="center">
            <Col span={12}><img src={currentURL ?? ""} alt="" className="w-full max-w-full max-h-full" ref={fullScreenRef}/></Col>
        </Row>

    </Col>
}