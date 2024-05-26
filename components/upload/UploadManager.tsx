"use client"

import {useCallback, useContext, useState} from "react";
import {UploadContext} from "@/components/upload/UploadContextProvider";
import {Button, Col, Row} from "antd";
import {UploaderName} from "@/components/upload/UploaderName";
import {ImageManager} from "@/components/upload/ImageManager";
import {addDoc, collection} from "firebase/firestore/lite";
import {cloudStorage, firestore} from "@/lib/firebase/firebase";
import {ref, uploadBytes} from "@firebase/storage";

export const UploadManager = () => {
    const {uploaderName, images, setImages, tags, setTags} = useContext(UploadContext);
    const [uploading, setUploading] = useState(false);

    /** uploads image files to google cloud and stores meta info in firestore  */
    const upload = useCallback(async () => {
        setUploading(true);

        const imageCollection = collection(firestore, "images");

        await Promise.all(images.map(async (image,  index) => {
            const imageRef = ref(cloudStorage, `${uploaderName}/${image.id}`);

            await uploadBytes(imageRef, image.file as Blob);

            await addDoc(imageCollection, {
                uploaderName,
                path: imageRef.fullPath,
                tags: tags[image.id]
            });

            setUploading(false);
        }));

        setImages([]);
        setTags({});

    }, [uploaderName, images, tags])

    return <>
        <Row justify="center" className="mt-7 mb-5">
            <Col>
                <UploaderName />
            </Col>
        </Row>

        {!!uploaderName && <Row justify="center">
            <Col>
                <ImageManager/>
            </Col>
        </Row>}

        {!!uploaderName && images.length > 0 &&
            <div className="flex justify-center items-center p-5 bg-white !fixed !bottom-0 left-0 !w-full">
                <Button
                    type="primary"
                    className="!font-bold !w-full"
                    loading={uploading}
                    onClick={upload}
                >
                    Hochladen!
                </Button>
            </div>
        }
    </>
}