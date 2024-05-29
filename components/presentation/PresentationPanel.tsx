"use client"

import {useContext, useEffect, useRef, useState} from "react";
import {PresentationContext} from "@/components/presentation/PresentationContextProvider";
import {getDownloadURL, ref} from "@firebase/storage";
import {cloudStorage} from "@/lib/firebase/firebase";
import {Button, Col, Row} from "antd";

export const PresentationPanel = () => {
    const { images } = useContext(PresentationContext);
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
        <Row justify={"center"} className="mb-5">
            <Button type="primary" onClick={enterFullscreen}>Vollbild</Button>
        </Row>

        <Row justify="center">
            <Col span={12}><img src={currentURL ?? ""} alt="" className="w-full max-w-full max-h-full" ref={fullScreenRef}/></Col>
        </Row>

    </Col>
}